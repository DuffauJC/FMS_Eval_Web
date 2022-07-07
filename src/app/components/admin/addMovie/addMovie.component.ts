import { Component, OnInit, DoCheck } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authentificate.service';
import { ApiService } from 'src/app/services/api.service';
import { City } from 'src/app/model/city.model';
import { Theater } from 'src/app/model/theater.model';


@Component({
    selector: 'app-addmovie',
    templateUrl: 'addMovie.component.html'
})

export class AddMovieComponent implements OnInit, DoCheck {
    ngForm: FormGroup

    display = false
    problemAdmin = false
    error = null

    data = {
        id: 0,
        name: "",
        date: new Date,
        img: "assets/img/unknown.png",
        description: "",
        theaters: <any>[]
    }

    listTheater: Theater[] | undefined
    model: Theater | undefined


    constructor(private apiService: ApiService,
        private router: Router, public authenticateService: AuthenticateService
    ) {

        this.listTheater = []
        this.ngForm = new FormGroup({
            name: new FormControl(this.data.name),
            date: new FormControl(this.data.date),
            img: new FormControl(this.data.img),
            description: new FormControl(this.data.description),
            selectedTheaters: new FormArray([])

        })
    }

    ngOnInit() {
        this.formData()
        this.getAllTheater()
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
    getAllTheater() {
        this.listTheater = []
        this.apiService.getTheaters().subscribe({
            next: (data) => this.listTheater = data,
            error: (err) => this.error = err.message,
            complete: () => this.error = null
        })
    }
    onCheckboxChange(event: any) {
        const selectedTheaters: FormArray = this.ngForm.get('selectedTheaters') as FormArray;

        if (event.target.checked) {
            selectedTheaters.push(new FormControl(event.target.value));
        } else {
            const index = selectedTheaters.controls
                .findIndex(x => x.value === event.target.value);
            selectedTheaters.removeAt(index);
        }
    }
    onAddMovie(form: FormGroup) {
        console.log(form.value)

        this.data.name = form.value.name
        this.data.img = form.value.img
        this.data.description = form.value.description
        this.data.date = form.value.date
       
        //filtre sur index
        let tab = [] = form.value.selectedTheaters
        for (let index = 1; index <= tab.length; index++) {
            this.data.theaters.push(index)
            
        }

        document.getElementById('modal-btn')?.classList.toggle("is_active")
        this.apiService.postMovie(this.data)
            .subscribe({
                next: (data) => console.log(data),
                error: (err) => this.error = err.message,
                complete: () => this.router.navigateByUrl('listMovie')
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
            id: 0,
            name: "",
            date: new Date,
            img: "assets/img/unknown.png",
            description: "",
            theaters: []
        }

        this.ngForm = new FormGroup({
            name: new FormControl(this.data.name),
            date: new FormControl(this.data.date),
            img: new FormControl(this.data.img),
            description: new FormControl(this.data.description),
            selectedTheaters: new FormArray([new FormControl(this.listTheater)])
        })
    }
}