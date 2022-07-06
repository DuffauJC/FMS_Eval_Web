import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/model/movie.model';
import { ApiService } from 'src/app/services/api.service';



@Component({
  selector: 'app-theater',
  templateUrl: './theater.component.html',
})

export class TheaterComponent implements OnInit {

  listMovies: Movie[] | undefined
  error = null;
  theaterName = ""
  id: number


  constructor(
    private router: Router, private apiservice: ApiService, private route: ActivatedRoute,
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }


  ngOnInit(): void {
    this.getAllTheaterMovies()
    this.getTheaterName()
  }


  getAllTheaterMovies() {
    this.listMovies = []
    // les films à l'affichent
    this.apiservice.getMoviesByTheaterId(this.id).subscribe({
      next: (data) => this.listMovies = data,
      error: (err) => this.error = err.message,
      complete: () => this.error = null
    })


  }
  getTheaterName() {
    // nom du cinéma
    this.apiservice.getTheaterById(this.id).subscribe({
      next: (data) => this.theaterName = data[0].name,
      error: (err) => this.error = err.message,
      complete: () => this.error = null
    })
  }

}
