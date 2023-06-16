import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  browserSessionPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signOut,
} from 'firebase/auth';
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

  constructor(private router: Router, private firestore: Firestore) {
    this.collectionRef = collection(this.firestore, 'logincred');
  }

  ngOnInit(): void {
    this.listenToAuthChanges();
  }

  listenToAuthChanges(): void {
    const auth = getAuth();
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            this.loggedInUser = user;
            this.getDataFromFirestore(user.uid);
          } else {
            this.loggedInUser = null;
          }
        });
      })
      .catch((error) => {
        console.log('Error setting auth persistence:', error);
      });
  }

  getDataFromFirestore(uid: string): void {
    const queryRef = query(this.collectionRef, where('uid', '==', uid));

    getDocs(queryRef)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
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
  signOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('Sign out successful');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log('Sign out error:', error);
      });
  }
}
