import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCityComponent } from './components/admin/addCity/addCity.component';
import { HomeAdminComponent } from './components/admin/homeAdmin.component';
import { ListCityComponent } from './components/admin/listCity/listCity.component';
import { CitiesComponent } from './components/cities/cities.component';
import { CityTheaterComponent } from './components/cityTheater/cityTheater.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/notFound/notFound.component';
import { TheaterComponent } from './components/theater/theater.component';
import { AuthGuard } from './components/_helpers/authGuard.components';
import { Role } from './model/role';

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
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'admin',
    component: HomeAdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  }, 
  {
    path: 'addCity',
    component: AddCityComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'listCity',
    component: ListCityComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
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
