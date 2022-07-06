import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CitiesComponent } from './components/cities/cities.component';
import { CityTheaterComponent } from './components/cityTheater/cityTheater.component';
import { TheaterComponent } from './components/theater/theater.component';
import { HomeComponent } from './components/home/home.component';
import { HomeAdminComponent } from './components/admin/homeAdmin.component';
import { AddCityComponent } from './components/admin/addCity/addCity.component';
import { ListCityComponent } from './components/admin/listCity/listCity.component';
import { ListTheaterComponent } from './components/admin/listTheater/listTheater.component';

@NgModule({
  declarations: [
    AppComponent,
    CitiesComponent,
    CityTheaterComponent,
    TheaterComponent,
    HomeComponent,
    HomeAdminComponent,
    AddCityComponent,
    ListCityComponent,
    ListTheaterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
