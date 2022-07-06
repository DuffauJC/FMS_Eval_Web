import { Component, DoCheck, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authentificate.service';
import { ApiService } from 'src/app/services/api.service';
import { Theater } from 'src/app/model/theater.model';


@Component({
    selector: 'app-listtheater',
    templateUrl: 'listTheater.component.html'
})

export class ListTheaterComponent implements OnInit, DoCheck {
    ngForm: FormGroup
    error = null
    displayStyle = "none";
    display = false
    problemAdmin = false

    data = {
        id: 0,
        name: "",
        address:""
    }
    listTheaters: Theater[] | undefined
    constructor(
        private apiService: ApiService,
        private router: Router, public authenticateService: AuthenticateService, 
    ) {
        this.data = {
            id: 0,
            name: "",
            address:""
        }
        this.ngForm = new FormGroup({
            name: new FormControl(this.data.name),
            address:new FormControl(this.data.address)
        })
    }
    ngOnInit() {
      this.getAllTheaters()
    }
    ngDoCheck(): void {
        this.verifySession()
    }
    getAllTheaters() {
        this.listTheaters = []
        this.apiService.getTheaters().subscribe({
            next: (data) => this.listTheaters = data,
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
 
    openPopup(theater: Theater) {
        this.displayStyle = "block";
        this.ngForm = new FormGroup({
            name: new FormControl(theater.name),
            address:new FormControl(theater.address)
        })
        this.data.id = theater.id
    }
    closePopup() {
        this.displayStyle = "none";
    }
    onUpdateTheater(form: FormGroup) {
        this.data.name = form.value.name
     
        document.getElementById('modal-btn')?.classList.toggle('is_active')

        this.apiService.updateTheater(this.data)
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

}