import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tripdetails',
  templateUrl: './tripdetails.component.html',
  styleUrls: ['./tripdetails.component.css']
})
export class TripdetailsComponent implements OnInit {
  userForms: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchUserForms();
  }

  fetchUserForms() {
    this.http.get<any>('https://final-build-f2a86-default-rtdb.firebaseio.com/users.json')
      .subscribe(
        (response) => {
          if (response) {
            this.userForms = Object.values(response);
          }
        },
        (error) => {
          console.log('Error fetching data:', error);
        }
      );
  }

  editUser(user: any) {
    console.log("User being edited:", user);
  
    if (user && user.id) {
      this.router.navigate(['/Trip/Create', user.id]);
    } else {
      console.log("Invalid user object or missing ID");
    }
  }
  
}
