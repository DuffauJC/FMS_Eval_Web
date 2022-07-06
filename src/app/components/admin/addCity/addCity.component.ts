import { Component, OnInit, DoCheck } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authentificate.service';
import { ApiService } from 'src/app/services/api.service';


@Component({
    selector: 'app-addcity',
    templateUrl: 'addCity.component.html'
})

export class AddCityComponent implements OnInit, DoCheck {
    ngForm: FormGroup
    display = false
    problemAdmin = false
    error = ""
    data = {
        name: ""
    }

    constructor(private apiService: ApiService,
        private router: Router, public authenticateService: AuthenticateService
    ) {
        this.ngForm = new FormGroup({
            name: new FormControl(this.data.name)
        })
    }

    ngOnInit() {
        this.formData()
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
    onSaveCity(form: FormGroup) {
        this.data.name = form.value.name
        document.getElementById('modal-btn')?.classList.toggle("is_active")
        this.apiService.postCity(this.data)
            .subscribe({
                next: (data) => console.log(data),
                error: (err) => this.error = err.message,
                complete: () => this.router.navigateByUrl('listCity')
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
            name: ""
        }
        this.ngForm = new FormGroup({
            name: new FormControl(this.data.name)
        })
    }
}