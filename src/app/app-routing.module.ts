import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripdetailsComponent } from './Components/tripdetails/tripdetails.component';
import { UserformComponent } from './Components/userform/userform.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { UsersComponent } from './Components/users/users.component';
import { UserviewComponent } from './Components/userview/userview.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { AuthGuard } from './Services/authguard.service';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'userview',
    component: UserviewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: LoginComponent,
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
    canActivate: [AuthGuard],
  },
  {
    path: 'Trip/List',
    component: TripdetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'Trip/Create/:id',
    component: UserformComponent,
    // canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
