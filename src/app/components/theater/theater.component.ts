import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/model/movie.model';
import { ApiService } from 'src/app/services/api.service';



@Component({
  selector: 'app-theater',
  templateUrl: './theater.component.html',
})

export class TheaterComponent implements OnInit, DoCheck {

  listMovies: Movie[] | undefined
  error = null;
 

  constructor(
    private router: Router, private apiservice: ApiService, private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
  this.getAllTheaterMovies()
  }
  ngDoCheck(): void {

  }

  getAllTheaterMovies() {
    this.listMovies = []
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.apiservice.getMoviesByTheaterId(id).subscribe({
      next: (data) => this.listMovies = data,
      error: (err) => this.error = err.message,
      complete: () => this.error = null
    })
  }
 

}
