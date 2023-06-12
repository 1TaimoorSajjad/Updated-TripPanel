import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripdetailsComponent } from './Components/tripdetails/tripdetails.component';
import { UserformComponent } from './Components/userform/userform.component';

const routes: Routes = [
  {
    path: 'Trip/Create',
    component: UserformComponent
  },
  {
    path: 'Trip/List',
    component: TripdetailsComponent
  },
  {
    path: 'Trip/Create/:id',
    component: UserformComponent
  },
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
