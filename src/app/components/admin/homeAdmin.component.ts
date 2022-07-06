import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthenticateService } from '../../services/authentificate.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin',
    templateUrl: 'homeAdmin.component.html'
})

export class HomeAdminComponent implements OnInit, DoCheck {
    problemAdmin = false
    constructor(private router: Router, public authenticateService: AuthenticateService) { }

    ngOnInit() { }

    ngDoCheck(): void {
        this.verifySession()
    }

    verifySession() {
        let user = this.authenticateService.getUserFromStorage()
        // console.log(customer)
        if (user.role != "admin") {
            this.problemAdmin = true
            setTimeout(() => {
                this.problemAdmin = false
                this.router.navigateByUrl('home')
            }, 1500)
        }
    }
    addCity() {
        this.router.navigateByUrl('addCity')
    }
    showCity() {
        this.router.navigateByUrl('listCity')
    }
    addTheater() {
        this.router.navigateByUrl('addTheater') 
    }
    showTheaters() {
        this.router.navigateByUrl('listTheater')
    }
    addMovie() {
        this.router.navigateByUrl('addMovie')
    }
    showMovies() {
        this.router.navigateByUrl('listMovie')
    }
}