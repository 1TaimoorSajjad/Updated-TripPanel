import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private f: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userForm = this.f.group({
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
      const userId = params['id'];
      if (userId) {
        this.populateFormWithId(userId);
      }
    });
  }

  populateFormWithId(id: string) {
    this.http
      .get(`https://final-build-f2a86-default-rtdb.firebaseio.com/users/${id}.json`)
      .subscribe((response: any) => {
        if (response) {
          const user = {
            ...response,
            documentId: id
          };
          this.userForm.patchValue(user);
        }
      });
  }
  

  onSubmit() {
    const formData = this.userForm.value;
  
    if (formData.documentId) {
      const documentId = formData.documentId;
      delete formData.documentId;
  
      this.http.put(`https://final-build-f2a86-default-rtdb.firebaseio.com/users/${documentId}.json`, formData)
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
  
  
}
