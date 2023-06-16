import { Component, OnInit } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Router } from '@angular/router';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  setDoc,
  CollectionReference,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private firestore: Firestore) {}

  ngOnInit(): void {}

  login() {
    const auth = getAuth();
    console.log('login auth', auth);
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then(() => {
        console.log('Login successful');
        this.router.navigate(['/Trip/Create']);
      })
      .catch((error) => {
        console.log('Error logging in:', error);
      });
  }
}
