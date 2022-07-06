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

    // public getTrainingById(id: number) {
    //     return this.http.get<Training>(environment.host + "/trainings/" + id);
    // }
    // public postTraining(data: any) {
    //     //console.log(data);
    //    return this.http.post<any>(environment.host + "/trainings", data)

    // }
    // public delItem(training: Training) {
    //     //console.log(training)
    //    return this.http.delete(environment.host + "/trainings/" + training.id)

    // }
    // public updateTraining(data: any) {
    //     //console.log(data);
    //    return this.http.put<any>(environment.host + "/trainings/" + data.id, data)

    // }
    // // save customer in bdd
    // public postCustomer(data: any) {
    //     //console.log(data);
    //    return this.http.post<any>(environment.host + "/customers", data)

    // }
    // // get customer with mail param
    // public getCustomer(email: string) {
    //     //console.log(email)
    //     let queryParams = new HttpParams();
    //     queryParams = queryParams.append("email", email);
    //     //console.log(queryParams)
    //     return this.http.get<Customer[]>(environment.host + "/customers", { params: queryParams })
    // }
}