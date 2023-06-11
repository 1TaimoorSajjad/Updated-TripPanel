import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-tripdetails',
  templateUrl: './tripdetails.component.html',
  styleUrls: ['./tripdetails.component.css']
})
export class TripdetailsComponent implements OnInit {
  userForm!: FormGroup  ;
  constructor(private f : FormBuilder) { }

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

  onSubmit(){
    const formData = this.userForm.value;
    console.log("Data form the form" , formData)
  }
}
