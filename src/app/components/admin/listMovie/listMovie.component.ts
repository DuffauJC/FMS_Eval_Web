import { Component, DoCheck, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authentificate.service';
import { ApiService } from 'src/app/services/api.service';
import { City } from 'src/app/model/city.model';
import { Movie } from 'src/app/model/movie.model';


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
        img: "assets/ img / unknown.png",
        description: "",
        theaters:[]
    }
    listCities: City[] | undefined
    model: City | undefined
    listMovies: Movie[] | undefined

    constructor(
        private apiService: ApiService,
        private router: Router, public authenticateService: AuthenticateService, 
    ) {
       
        this.ngForm = new FormGroup({
            name: new FormControl(this.data.name),
            date: new FormControl(this.data.date),
            img: new FormControl(this.data.img),
            description: new FormControl(this.data.description),
            theaters:new FormControl(this.data.theaters)
        })
    }
    ngOnInit() {
        this.getAllMovies()
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
            theaters:new FormControl(movie.theaters)
        })
        this.data.id = movie.id
    }
    closePopup() {
        this.displayStyle = "none";
    }
    onUpdateMovie(form: FormGroup) {
        this.data.name = form.value.name
        this.data.description = form.value.description
        this.data.date = form.value.date
        this.data.img = form.value.img
        this.data.theaters=form.value.description
     
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

}