import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { City } from '../../model/city.model';


@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
})

export class CitiesComponent implements OnInit, DoCheck {

  listCities: City[] | undefined
  error = null;
 
  constructor(
    private router: Router, private apiservice: ApiService
  ) {

  }

  ngOnInit(): void {
    this.getAllCities()
  }
  ngDoCheck(): void {

  }

  getAllCities() {
    this.listCities = []
    this.apiservice.getCities().subscribe({
      next: (data) => this.listCities = data,
      error: (err) => this.error = err.message,
      complete: () => this.error = null
    })
  }
  onCityTheater(id: any) {
    this.router.navigateByUrl('theaters/' + id)
  }

}
