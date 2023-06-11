import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FirestoreModule } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserformComponent } from './Components/userform/userform.component';
import { TripdetailsComponent } from './Components/tripdetails/tripdetails.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideFirebaseApp } from '@angular/fire/app';
import { firestore,} from 'firebase';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    UserformComponent,
    TripdetailsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FirestoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
function initializeApp(firebase: any): import("@firebase/app").FirebaseApp {
  throw new Error('Function not implemented.');
}

