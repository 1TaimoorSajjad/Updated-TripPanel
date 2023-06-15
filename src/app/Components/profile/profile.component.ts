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

  async getDataFromFirestore(): Promise<void> {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const uid = user.uid;
      const docRef = doc(this.collectionRef, uid);

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.loggedInUser = docSnap.data();
      } else {
        console.log('No such document!');
      }
    }
  }
}
