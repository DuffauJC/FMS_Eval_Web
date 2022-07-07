import { Component, DoCheck, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/model/city.model';
import { AuthenticateService } from 'src/app/services/authentificate.service';
import { ApiService } from 'src/app/services/api.service';


@Component({
    selector: 'app-listcity',
    templateUrl: 'listCity.component.html'
})

export class ListCityComponent implements OnInit, DoCheck {
    ngForm: FormGroup
    error = null
    displayStyle = "none";
    display = false
    problemAdmin = false

    data = {
        id: 0,
        name: "",
    }
    listCities: City[] | undefined
    constructor(
        private apiService: ApiService,
        private router: Router, public authenticateService: AuthenticateService, 
    ) {
        this.data = {
            id: 0,
            name: "",
        }
        this.ngForm = new FormGroup({
            name: new FormControl(this.data.name),
        })
    }
    ngOnInit() {
      this.getAllCities()
    }
    ngDoCheck(): void {
        this.verifySession()
    }
    getAllCities() {
        this.listCities = []
        this.apiService.getCities().subscribe({
            next: (data) => this.listCities = data,
            error: (err) => this.error = err.message,
            complete: () => this.error = null
        })
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
    openPopup(city: City) {
        this.displayStyle = "block";
        this.ngForm = new FormGroup({
            name: new FormControl(city.name),
        })
        this.data.id = city.id
    }
    closePopup() {
        this.displayStyle = "none";
    }
    onUpdateCity(form: FormGroup) {

        //console.log(form.value)
        this.data.name = form.value.name
     
        document.getElementById('modal-btn')?.classList.toggle('is_active')

        this.apiService.updateCity(this.data)
            .subscribe({
                next: (data) => console.log(data),
                error: (err) => this.error = err.message,
                
        })
        this.display = true

        setTimeout(() => {
            this.display = false
            this.displayStyle = "none";
            document.getElementById('modal-btn')?.classList.toggle('is_active')
            this.ngOnInit()
        }, 500)
    }

    delCity(city: City) {
        if (confirm("Vous êtes sur de vouloir supprimer cette ville ?")) {
            this.apiService.delCity(city)
                .subscribe({
                    next: (data) => console.log(data),
                    error: (err) => this.error = err.message,

                })
        }
    }
}