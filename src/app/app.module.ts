import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserformComponent } from './Components/userform/userform.component';
import { TripdetailsComponent } from './Components/tripdetails/tripdetails.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SidenavComponent } from './Components/common/sidenav/sidenav.component';
import { FormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FirestoreModule } from '@angular/fire/firestore';
import { PlacesDirective } from './Directives/places.directive';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { UsersComponent } from './Components/users/users.component';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { UserviewComponent } from './Components/userview/userview.component';
import { ProfileComponent } from './Components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    UserformComponent,
    TripdetailsComponent,
    SidenavComponent,
    PlacesDirective,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    UserviewComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FirestoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
