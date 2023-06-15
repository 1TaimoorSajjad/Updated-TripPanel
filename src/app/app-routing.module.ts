import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripdetailsComponent } from './Components/tripdetails/tripdetails.component';
import { UserformComponent } from './Components/userform/userform.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { UsersComponent } from './Components/users/users.component';
import { UserviewComponent } from './Components/userview/userview.component';
import { ProfileComponent } from './Components/profile/profile.component';

const routes: Routes = [
  {
    path: 'profiles',
    component: ProfileComponent,
  },
  {
    path: 'userview',
    component: UserviewComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: '',
    component: RegisterComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'Trip/Create',
    component: UserformComponent,
  },
  {
    path: 'Trip/List',
    component: TripdetailsComponent,
  },
  {
    path: 'Trip/Create/:id',
    component: UserformComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
