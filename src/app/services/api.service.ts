import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Theater } from '../model/theater.model';
import { environment } from 'src/environments/environment';
import { User } from '../model/user.model';
import { City } from '../model/city.model'
import { Observable } from 'rxjs';
import { Movie } from '../model/movie.model';


@Injectable({ providedIn: 'root' })

export class ApiService {
    constructor(private http: HttpClient) { }
   
    public getTheaters() {
        return this.http.get<Theater[]>(environment.host + "/theaters")
    }
    public getTheaterById(id: number) {
        return this.http.get<Theater[]>(environment.host + "/theaters?id=" + id)
    }
    public getTheatersByCityId(id:any) {
        return this.http.get<Theater[]>(environment.host + "/theaters?idCity="+id)
    }
    public getTheaterByName(name: any) {
        return this.http.get<Theater[]>(environment.host + "/theaters?name="+name)
    }
    public getMoviesByTheaterId(id: any) {
        return this.http.get<Movie[]>(environment.host + "/movies?theaters/="+id)
    }
    public getCities() {
        return this.http.get<City[]>(environment.host + "/cities")
    }
    public postCity(data: any) {
       return this.http.post<any>(environment.host + "/cities", data)
     }
    public delCity(city:City) {
       return this.http.delete(environment.host + "/cities/" + city.id)
    }
    public updateCity(data: any) {
       return this.http.put<any>(environment.host + "/cities/" + data.id, data)
    }
    public postTheater(data: any) {
        return this.http.post<any>(environment.host + "/theaters", data)
    }
    public updateTheater(data: any) {
        return this.http.put<any>(environment.host + "/theaters/" + data.id, data)
    }
    public delTheater(theater: Theater) {
        return this.http.delete(environment.host + "/theaters/" + theater.id)
    }
    public getMovies() {
        return this.http.get<Movie[]>(environment.host + "/movies")
    }
    public updateMovie(data: any) {
        return this.http.put<any>(environment.host + "/movies/" + data.id, data)
    }
    public delMovie(movie: Movie) {
        return this.http.delete(environment.host + "/movies/" + movie.id)
    }
    public postMovie(data: any) {
        return this.http.post<any>(environment.host + "/movies", data)
    }
    // // save customer in bdd
    // public postCustomer(data: any) {
    //     //console.log(data);
    //    return this.http.post<any>(environment.host + "/customers", data)

    // }
    // get customer with mail param
    public getUser(email: string) {
        //console.log(email)
        let queryParams = new HttpParams();
        queryParams = queryParams.append("email", email);
        //console.log(queryParams)
        return this.http.get<User[]>(environment.host + "/users", { params: queryParams })
    }
}