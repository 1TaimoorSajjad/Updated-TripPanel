import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  query,
  collection,
  where,
  getDocs,
} from '@angular/fire/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  loggedInUser: any;
  collectionRef: any;

  constructor(private firestore: Firestore) {
    this.collectionRef = collection(this.firestore, 'logincred');
  }

  ngOnInit(): void {
    this.listenToAuthChanges();
  }

  listenToAuthChanges(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const email = user.email;
        const uid = user.uid;

        if (email) {
          this.getDataFromFirestore(email, uid);
        } else {
          console.log('User email is null.');
          this.loggedInUser = null;
        }
      } else {
        this.loggedInUser = null;
      }
    });
  }

  getDataFromFirestore(email: string, uid: string): void {
    const queryRef = query(
      this.collectionRef,
      where('email', '==', email),
      where('uid', '==', uid)
    );

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
}
