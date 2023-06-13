import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface UserFormData {
  id: string;
  clientName: string;
  phoneNumber: string;
  cellNumber: string;
  tripID: string;
  pickupAddress: string;
  dropOffAddress: string;
  state: string;
  miles: string;
  csr: string;
  companyNotes: string;
  serviceType: string;
}
@Component({
  selector: 'app-tripdetails',
  templateUrl: './tripdetails.component.html',
  styleUrls: ['./tripdetails.component.css'],
})
export class TripdetailsComponent implements OnInit {
  userForms: UserFormData[] = [];
  searchQuery: string = ' ';
  data!: Observable<UserFormData[]>;
  collectionRef: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private firestore: Firestore,
    private ActivatedRoute: ActivatedRoute
  ) {
    this.collectionRef = collection(this.firestore, 'BrokerTrips');
  }

  ngOnInit(): void {
    // this.fetchUserForms();
    const collectionRef = collection(this.firestore, 'BrokerTrips');
    this.data = collectionData(collectionRef) as Observable<UserFormData[]>;
    this.fetchData();
  }

  // fetchUserForms() {
  //   this.http.get<any>('https://final-build-f2a86-default-rtdb.firebaseio.com/users.json')
  //     .subscribe(
  //       (response) => {
  //         if (response) {
  //           this.userForms = Object.keys(response).map(key => ({ id: key, ...response[key] }));
  //         }
  //       },
  //       (error) => {
  //         console.log('Error fetching data:', error);
  //       }
  //     );
  // }

  fetchData() {
    this.data = collectionData(this.collectionRef, {
      idField: 'id',
    }) as Observable<UserFormData[]>;
    this.data.subscribe((data: UserFormData[]) => {
      this.userForms = data;
    });
  }

  // editUser(user: any) {
  //   console.log("User being edited:", user);

  //   if (user && user.id) {
  //     const index = this.userForms.findIndex((form) => form.id === user.id);
  //     if (index !== -1) {
  //       this.userForms[index] = { ...this.userForms[index], ...user };
  //       this.router.navigate(['/Trip/Create', user.id]);
  //     }
  //   } else {
  //     console.log("Invalid user object or missing ID");
  //   }
  // }
  editUser(id: string) {
    if (id) {
      this.router.navigate(['/Trip/Create', id], {
        relativeTo: this.ActivatedRoute,
      });
    }
  }
  // deleteUser(userId: string) {
  //   if (userId) {
  //     this.http.delete(`https://final-build-f2a86-default-rtdb.firebaseio.com/users/${userId}.json`)
  //       .subscribe(
  //         () => {
  //           this.userForms = this.userForms.filter(user => user.id !== userId);
  //         },
  //         (error) => {
  //           console.log('Error deleting user:', error);
  //         }
  //       );
  //   } else {
  //     console.log("Invalid user ID");
  //   }
  // }
  deleteUser(id: string) {
    if (id) {
      const documentRef = doc(this.firestore, 'BrokerTrips', id);
      deleteDoc(documentRef)
        .then(() => {
          console.log('Document deleted successfully');
        })
        .catch((error) => {
          console.error('Error deleting document: ', error);
        });
    }
  }

  get filteredUserForms(): any[] {
    if (this.searchQuery.trim() === '') {
      return this.userForms;
    } else {
      const query = this.searchQuery.toLowerCase();
      return this.userForms.filter(
        (user) =>
          user.clientName.toLowerCase().includes(query) ||
          user.phoneNumber.toLowerCase().includes(query) ||
          user.pickupAddress.toLowerCase().includes(query) ||
          user.dropOffAddress.toLowerCase().includes(query)
      );
    }
  }
}
