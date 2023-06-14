import { Component, OnInit } from '@angular/core';
import { Firestore, collection, doc, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: any;
  password: any;
  collectionRef;

  constructor(private firestore: Firestore, private router: Router) {
    this.collectionRef = collection(this.firestore, 'logincred');
  }

  ngOnInit(): void {}

  async login() {
    const docRef = doc(this.collectionRef, 'logincred');
    const docSnap = await getDoc(docRef);
    console.log('hello', docSnap);

    if (docSnap) {
      const data = docSnap.data();
      console.log('data', data);
      const storedEmail = data?.email;
      const storedPassword = data?.password;

      console.log('Stored Email:', storedEmail);
      console.log('Stored Password:', storedPassword);
      console.log('Entered Email:', this.email);
      console.log('Entered Password:', this.password);

      if (this.email === storedEmail && this.password === storedPassword) {
        console.log('Login successful');
        this.router.navigate(['/Trip/Create']);
      } else {
        console.log('Incorrect credentials');
      }
    }
  }
}
