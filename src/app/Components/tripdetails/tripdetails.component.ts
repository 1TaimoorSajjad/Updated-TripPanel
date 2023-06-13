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
  searchQuery: string = " ";

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchUserForms();
  }

  fetchUserForms() {
    this.http.get<any>('https://final-build-f2a86-default-rtdb.firebaseio.com/users.json')
      .subscribe(
        (response) => {
          if (response) {
            this.userForms = Object.keys(response).map(key => ({ id: key, ...response[key] }));
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
      const index = this.userForms.findIndex((form) => form.id === user.id);
      if (index !== -1) {
        this.userForms[index] = { ...this.userForms[index], ...user };
        this.router.navigate(['/Trip/Create', user.id]);
      }
    } else {
      console.log("Invalid user object or missing ID");
    }
  }
  deleteUser(userId: string) {
    if (userId) {
      this.http.delete(`https://final-build-f2a86-default-rtdb.firebaseio.com/users/${userId}.json`)
        .subscribe(
          () => {
            this.userForms = this.userForms.filter(user => user.id !== userId);
          },
          (error) => {
            console.log('Error deleting user:', error);
          }
        );
    } else {
      console.log("Invalid user ID");
    }
  }

  get filteredUserForms(): any[] {
    if (this.searchQuery.trim() === '') {
      return this.userForms;
    } else {
      const query = this.searchQuery.toLowerCase();
      return this.userForms.filter(user =>
        user.clientName.toLowerCase().includes(query) ||
        user.phoneNumber.toLowerCase().includes(query) ||
        user.pickupAddress.toLowerCase().includes(query) ||
        user.dropOffAddress.toLowerCase().includes(query)
      );
    }
  }
  
}
