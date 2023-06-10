import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserformComponent } from './Components/userform/userform.component';
import { TripdetailsComponent } from './Components/tripdetails/tripdetails.component';

@NgModule({
  declarations: [
    AppComponent,
    UserformComponent,
    TripdetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
