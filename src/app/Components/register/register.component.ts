import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  email: any;
  password: any;
  collectionRef: any;

  constructor(private router: Router, private firestore: Firestore) {}

  ngOnInit(): void {}

  register() {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        const creds = { email: user.email, uid: user.uid };
        return addDoc(this.collectionRef, creds);
      })
      .then(() => {
        console.log('button clicked');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Error registering user:', error);
      });
  }
}
