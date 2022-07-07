import { Component, OnInit, DoCheck } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authentificate.service';
import { ApiService } from 'src/app/services/api.service';
import { City } from 'src/app/model/city.model';


@Component({
    selector: 'app-addtheater',
    templateUrl: 'addTheater.component.html'
})

export class AddTheaterComponent implements OnInit, DoCheck {
    ngForm: FormGroup
    display = false
    problemAdmin = false
    error = null
    data = {
        name: "",
        address: "",
        idCity:0
    }
    listCities: City[] | undefined
    model: City | undefined
    

    constructor(private apiService: ApiService,
        private router: Router, public authenticateService: AuthenticateService
    ) {
        this.ngForm = new FormGroup({
            name: new FormControl(this.data.name),
            address: new FormControl(this.data.address),
            idCity:new FormControl(this.data.idCity)
        })
    }

    ngOnInit() {
        this.formData()
        this.getAllCities()
    }
    ngDoCheck(): void {
        this.verifySession()
    }
    verifySession() {
        let user = this.authenticateService.getUserFromStorage()
       
        if (user.role != "admin") {
            this.problemAdmin = true
            setTimeout(() => {
                this.problemAdmin = false
                this.router.navigateByUrl('home')
            }, 1500)
        }
    }
    getAllCities() {
        this.listCities = []
        this.apiService.getCities().subscribe({
            next: (data) => this.listCities = data,
            error: (err) => this.error = err.message,
            complete: () => this.error = null
        })
    }
    onSaveTheater(form: FormGroup) {

        this.data.name = form.value.name
        this.data.address = form.value.address
        this.data.idCity =parseInt(form.value.idCity) 
        
        document.getElementById('modal-btn')?.classList.toggle("is_active")
        this.apiService.postTheater(this.data)
            .subscribe({
                next: (data) => console.log(data),
                error: (err) => this.error = err.message,
                complete: () => this.router.navigateByUrl('listTheater')
            })
        this.display = true
        setTimeout(() => {
            this.display = false
            document.getElementById('modal-btn')?.classList.toggle("is_active")
            this.ngOnInit()
        }, 1500)
    }
    formData() {
        this.data = {
            name: "",
            address: "",
            idCity:0
        }
        this.ngForm = new FormGroup({
            name: new FormControl(this.data.name),
            address: new FormControl(this.data.address),
            idCity: new FormControl(this.data.idCity)
        })
    }
}