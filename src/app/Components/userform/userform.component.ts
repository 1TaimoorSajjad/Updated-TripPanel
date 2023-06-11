import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit {
  userForm!: FormGroup;
  isEditMode: boolean = false;
  userId: string = '';

  constructor(
    private f: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userForm = this.f.group({
      documentId: new FormControl(''),
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
      serviceType: ['', Validators.required]
    });
  
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.userId = params.id;
        this.loadUserData(this.userId);
      }
    });
  }

  loadUserData(userId: string) {
    this.http.get<any>(`https://final-build-f2a86-default-rtdb.firebaseio.com/users/${userId}.json`)
      .subscribe(
        (response) => {
          if (response) {
            this.userForm.get('documentId')?.setValue(userId); 
            this.userForm.patchValue(response);
          } else {
            console.log('User not found');
          }
        },
        (error) => {
          console.log('Error fetching user data:', error);
        }
      );
  }
  

  

  onSubmit() {
    const formData = this.userForm.value;
  
    if (this.isEditMode) {
      delete formData.tripID;
      formData.id = this.userId;
      this.http.put(`https://final-build-f2a86-default-rtdb.firebaseio.com/users/${this.userId}.json`, formData)
        .subscribe(
          (response) => {
            console.log('Data updated successfully:', response);
            this.router.navigate(['/Trip/List']);
          },
          (error) => {
            console.log('Error updating data:', error);
          }
        );
    } else {
      this.http.post('https://final-build-f2a86-default-rtdb.firebaseio.com/users.json', formData)
        .subscribe(
          (response) => {
            console.log('Data sent successfully:', response);
            this.router.navigate(['/Trip/List']);
          },
          (error) => {
            console.log('Error sending data:', error);
          }
        );
    }
  }
  

  redirectToEditForm() {
    if (this.isEditMode) {
      this.router.navigate(['/Trip/Edit', this.userId]);
    }
  }
}
