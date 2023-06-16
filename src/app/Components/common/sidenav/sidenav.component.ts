import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signOut } from 'firebase/auth';
import {
  Firestore,
  query,
  collection,
  where,
  getDocs,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  isTripDetailsActive: boolean = true;
  loggedInUser: any;
  collectionRef: any;
  auth: any;

  constructor(private router: Router, private firestore: Firestore) {
    this.collectionRef = collection(this.firestore, 'logincred');
  }

  ngOnInit(): void {
    this.getDataFromFirestore();
  }

  getDataFromFirestore() {
    this.auth = getAuth();
    console.log(this.auth);
    const user = this.auth.currentUser;
    console.log('user', user);
    if (user) {
      const email = user.email;
      const uid = user.uid;

      console.log(user);
      const queryRef = query(
        this.collectionRef,
        where('email', '==', email),
        where('uid', '==', uid)
      );

      getDocs(queryRef)
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            console.log(querySnapshot.docs);
            const doc = querySnapshot.docs[0];
            this.loggedInUser = doc.data();
          } else {
            console.log('No matching document found!');
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        });
    }
  }

  signOut() {
    signOut(this.auth)
      .then((error) => {
        console.log('Sign in Successful:', error);

        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log('Sign out error:', error);
      });
  }
}
