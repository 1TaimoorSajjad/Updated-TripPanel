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

  constructor(private f: FormBuilder, private http: HttpClient , private router : Router) {} 

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
  }

  onSubmit() {
    const formData = this.userForm.value;
    console.log("Data from the form:", formData);

    this.http.post('https://final-build-f2a86-default-rtdb.firebaseio.com/users.json', formData)
      .subscribe(
        (response) => {
          console.log('Data sent successfully:', response);
        },
        (error) => {
          console.log('Error sending data:', error);
        }
      );
      this.router.navigate(['/Trip/List']);
  }
}
