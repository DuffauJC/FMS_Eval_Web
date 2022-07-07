import { Component, DoCheck, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authentificate.service';
import { ApiService } from 'src/app/services/api.service';
import { Movie } from 'src/app/model/movie.model';
import { Theater } from 'src/app/model/theater.model';


@Component({
    selector: 'app-listmovie',
    templateUrl: 'listMovie.component.html'
})

export class ListMovieComponent implements OnInit, DoCheck {
    ngForm: FormGroup
    error = null
    displayStyle = "none";
    display = false
    problemAdmin = false

   data = {
        id: 0,
        name: "",
        date: new Date,
        img: "assets/img/unknown.png",
        description: "",
        theaters: <any>[]
    }
   
    listMovies: Movie[] | undefined
    listTheater: Theater[] | undefined
    model: Theater | undefined



    constructor(
        private apiService: ApiService,
        private router: Router, public authenticateService: AuthenticateService, 
    ) {
       
        this.ngForm = new FormGroup({
            name: new FormControl(this.data.name),
            date: new FormControl(this.data.date),
            img: new FormControl(this.data.img),
            description: new FormControl(this.data.description),
            selectedTheaters: new FormArray([])
        })
    }
    ngOnInit() {
        this.getAllMovies()
        this.getAllTheater()
    }
    ngDoCheck(): void {
        this.verifySession()
    }
    getAllTheater() {
        this.listTheater = []
        this.apiService.getTheaters().subscribe({
            next: (data) => this.listTheater = data,
            error: (err) => this.error = err.message,
            complete: () => this.error = null
        })
    }
    getAllMovies() {
        this.listMovies = []
        this.apiService.getMovies().subscribe({
            next: (data) => this.listMovies = data,
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
 
    openPopup(movie: Movie) {
        this.displayStyle = "block";
        this.ngForm = new FormGroup({
            name: new FormControl(movie.name),
            date: new FormControl(movie.date),
            img: new FormControl(movie.img),
            description: new FormControl(movie.description),
            selectedTheaters: new FormArray([])
        })
        this.data.id = movie.id
    }
    closePopup() {
        this.displayStyle = "none";
    }
    onUpdateMovie(form: FormGroup) {
        this.data.name = form.value.name
        this.data.img = form.value.img
        this.data.description = form.value.description
        this.data.date = form.value.date

        //filtre sur index
        let tab = []
        tab = form.value.selectedTheaters
        for (let index = 1; index < tab.length; index++) {
            this.data.theaters.push(parseInt(tab[index]))
        }
        document.getElementById('modal-btn')?.classList.toggle('is_active')

        this.apiService.updateMovie(this.data)
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
    delMovie(movie: Movie) {
        if (confirm("Vous êtes sur de vouloir supprimer ce film ?")) {
            this.apiService.delMovie(movie)
                .subscribe({
                    next: (data) => console.log(data),
                    error: (err) => this.error = err.message,

                })
        }
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

}