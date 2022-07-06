import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitiesComponent } from './components/cities/cities.component';
import { CityTheaterComponent } from './components/cityTheater/cityTheater.component';
import { NotFoundComponent } from './components/notFound/notFound.component';
import { TheaterComponent } from './components/theater/theater.component';

const routes: Routes = [
  {
  path:'cities',component:CitiesComponent
  },
  {
    path: 'theaters/:id', component: CityTheaterComponent
  },
  {
    path: 'theater/:id', component: TheaterComponent
  },
  {
    path: '404', component: NotFoundComponent
  },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
