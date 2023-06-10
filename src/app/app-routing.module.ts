import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripdetailsComponent } from './Components/tripdetails/tripdetails.component';

const routes: Routes = [
  {
    path : "UserForm",
    component : TripdetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
