import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })

export class AuthenticateService {

    error = null
    ok=true
    constructor( private apiService: ApiService) {
    }
    // login verification
    veriFyLogin(data: any) {
        //console.log(data)
        
        this.apiService.getUser(data.email).subscribe(response => {
            //console.log(response[0])

            // if existant user mail in response && decode password verif
            if (response[0].email === data.email && window.atob(response[0].password) === data.password) {
               this.setUserInStorage({
                    email: response[0].email,
                    name: response[0].name,
                    firstName: response[0].firstName,
                    address: response[0].address,
                    phone:response[0].phone,
                    role: response[0].role
                })
                this.ok = true
            } else {
                this.ok = false
            }
        })
        if (this.ok) {
            return true
        } else {
            return false
        }

    }

    // set user in storage
    setUserInStorage(data: any) {
        localStorage.setItem('user',JSON.stringify(data));

    }
    // get user from storage
    getUserFromStorage() {
        let user = localStorage.getItem('user');
        if (user) return JSON.parse(user);
        return new User("","unknown","","","","","")
    }
    removeUserFromStorage() {
        localStorage.removeItem('user')
    }
}