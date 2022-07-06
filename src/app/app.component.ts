import { Component, DoCheck, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Theater } from './model/theater.model';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'FMS_Eval_Web';

  ngForm: FormGroup
  error = null
  result=false
  name: String
  listTheaters: Theater[] | undefined
  // modal search
  displayStyle = "none";

  // modal login
  displayLog = "block"
  
  data = {
    email: "",
    password: ""
  }
  // login alert
  display = false
  problemLogin = false

  constructor(
    private router: Router,
    private apiService: ApiService) {
    this.name = ""

    this.ngForm = new FormGroup({
      name: new FormControl(this.name),

    })

  }
  ngDoCheck(): void {
   
  }
  ngOnInit(): void {
   
  }

  onSearch(form: FormGroup) {
    this.listTheaters = []
    this.result = false
    if (form.valid) {
      this.name = form.value.name

      this.apiService.getTheaterByName(this.name)
        .subscribe({
          next: (data) => {
            // on ouvre la popup message en fonction de la taille du tableau
            if (data.length == 0) { 
              this.result=true 
            } else {
              this.listTheaters = data
              
            }},
         // next: (data) => this.listTheaters = data,
          error: (err) => this.error = err.message,
          complete: () => this.error = null
        })
      this.openPopup()
    }
  }
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
  onTheater(id: any) {
    this.router.navigateByUrl('theater/' + id)
    this.closePopup()
  }

  onLogin(form: FormGroup): void {
    //console.log(form.value);
    // if (form.valid) {
    //   this.data.email = form.value.email
    //   this.data.password = form.value.password

    //   //console.log(this.data)
    //   document.getElementById('modal-btn')?.classList.toggle("is_active")
    //   let ok = this.authenticateService.veriFyLogin(this.data)
    //   if (ok) {
    //     this.display = true
    //     setTimeout(() => {
    //       this.display = false
    //       this.router.navigateByUrl('home')
    //     }, 1500)
    //   } else {
    //     this.problemLogin = true
    //   }
    //   setTimeout(() => {
    //     this.problemLogin = false
    //   }, 1500)
    // }

  }
}
