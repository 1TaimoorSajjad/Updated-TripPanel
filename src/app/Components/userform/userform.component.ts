import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  setDoc,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css'],
})
export class UserformComponent implements OnInit {
  userForm!: FormGroup;
  documentId: string = '';
  collectionRef: any;
  fieldSelected = false;

  constructor(
    private f: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private firestore: Firestore
  ) {
    this.collectionRef = collection(this.firestore, 'BrokerTrips');
  }

  ngOnInit(): void {
    this.userForm = this.f.group({
      documentId: [''],
      clientName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      cellNumber: ['', Validators.required],
      tripID: ['', Validators.required],
      pickupAddress: ['', Validators.required],
      dropOffAddress: ['', Validators.required],
      state: ['', Validators.required],
      miles: ['', Validators.required],
      csr: ['', Validators.required],
      companyNotes: ['', Validators.required],
      serviceType: ['', Validators.required],
    });

    this.route.params.subscribe((params) => {
      const userId = params['id'];
      if (userId) {
        this.documentId = userId;
        this.populateFormWithId(userId);
      }
    });
  }

  // populateFormWithId(id: string) {
  //   this.http
  //     .get(`https://final-build-f2a86-default-rtdb.firebaseio.com/users/${id}.json`)
  //     .subscribe((response: any) => {
  //       if (response) {
  //         this.userForm.patchValue(response);
  //       }
  //     });
  // }

  populateFormWithId(id: string) {
    const docRef = doc(this.collectionRef, id);

    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const formData = docSnap.data();
          formData.documentId = id;
          this.userForm.patchValue(formData);
        } else {
          console.log('Document does not exist');
        }
      })
      .catch((error: any) => {
        console.log('Error retrieving document:', error);
      });
  }
  // onSubmit(){
  //   const formData = this.userForm.value;

  //   if (this.documentId) {
  //     this.http
  //       .put(`https://final-build-f2a86-default-rtdb.firebaseio.com/users/${this.documentId}.json`, formData)
  //       .subscribe(
  //         (response) => {
  //           console.log('Data updated successfully:', response);
  //           this.router.navigate(['/Trip/List']);
  //         },
  //         (error) => {
  //           console.log('Error updating data:', error);
  //         }
  //       );
  //   } else {
  //     this.http
  //       .post('https://final-build-f2a86-default-rtdb.firebaseio.com/users.json', formData)
  //       .subscribe(
  //         (response) => {
  //           console.log('Data sent successfully:', response);
  //           this.router.navigate(['/Trip/List']);
  //         },
  //         (error) => {
  //           console.log('Error sending data:', error);
  //         }
  //       );
  //   }
  // }

  onSubmit() {
    const formData = this.userForm.value;
    if (formData.documentId) {
      const documentId = formData.documentId;
      delete formData.documentId;

      updateDoc(doc(this.collectionRef, documentId), formData)
        .then(() => {
          console.log('Form data updated in Firestore');
          this.router.navigate(['/Trip/List']);
        })
        .catch((error: any) => {
          console.log('Error updating form data in Firestore:', error);
        });
    } else {
      addDoc(this.collectionRef, formData)
        .then(() => {
          console.log('Form data sent to Firestore');
          this.router.navigate(['/Trip/List']);
        })
        .catch((error: any) => {
          console.log('Error sending form data to Firestore:', error);
        });
    }
  }
  addDollarSign(event: any) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (!value.startsWith('$')) {
      input.value = '$' + value;
    }
  }

  onAddressSelected(address: any) {
    this.userForm.patchValue({ pickupAddress: address });
    console.log('Selected Address:', address);
  }
}
