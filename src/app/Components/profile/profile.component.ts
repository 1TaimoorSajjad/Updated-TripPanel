import { Component, Input, OnInit } from '@angular/core';
import {
  Firestore,
  query,
  collection,
  where,
  getDocs,
} from '@angular/fire/firestore';
import { getAuth } from 'firebase/auth';
import { UserService } from 'src/app/Services/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  loggedInUser: any;
  collectionRef: any;

  constructor(private firestore: Firestore, private userService: UserService) {
    this.collectionRef = collection(this.firestore, 'logincred');
  }

  ngOnInit(): void {
    this.getDataFromFirestore();
  }

  getDataFromFirestore(): void {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const email = user.email;
      const uid = user.uid;

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
            this.userService.setLoggedInUser(this.loggedInUser);
          } else {
            console.log('No matching document found!');
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        });
    }
  }
}
