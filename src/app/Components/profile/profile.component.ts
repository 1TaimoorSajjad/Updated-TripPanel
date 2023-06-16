import { Component, OnInit } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  loggedInUser: any;
  documentId: string = '';

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    this.getDataFromFirestore(this.documentId);
  }

  getDataFromFirestore(documentId: string): void {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const docRef = doc(this.firestore, 'logincred', documentId);

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
