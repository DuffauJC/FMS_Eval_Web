import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Theater } from 'src/app/model/theater.model';
import { ApiService } from 'src/app/services/api.service';
import { City } from '../../model/city.model';


@Component({
  selector: 'app-cityTheater',
  templateUrl: './cityTheater.component.html',
})

export class CityTheaterComponent implements OnInit, DoCheck {

  listTheaters: Theater[] | undefined
  error = null;
 

  constructor(
    private router: Router, private apiservice: ApiService, private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
  this.getAllTheaters()
  }
  ngDoCheck(): void {

  }

  getAllTheaters() {
    this.listTheaters = []
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.apiservice.getTheatersByCityId(id).subscribe({
      next: (data) => this.listTheaters = data,
      error: (err) => this.error = err.message,
      complete: () => this.error = null
    })
  }
  onTheater(id:any) {
    this.router.navigateByUrl('theater/'+id)
  }

}
