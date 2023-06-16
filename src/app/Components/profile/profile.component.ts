import { Component, OnInit } from '@angular/core';
import { Firestore, doc, getDoc, collection } from '@angular/fire/firestore';
import { getAuth } from 'firebase/auth';

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
    this.getDataFromFirestore();
  }

  getDataFromFirestore(): void {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const collectionId = user.uid;
      const docRef = doc(this.collectionRef, collectionId);

      getDoc(docRef)
        .then((docSnap) => {
          console.log('Document Snapshot:', docSnap);

          if (docSnap.exists()) {
            this.loggedInUser = docSnap.data();
          } else {
            console.log('No such document!');
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        });
    }
  }
}
