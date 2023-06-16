import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { getAuth, signOut } from 'firebase/auth';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  @Input() loggedInUser: any;

  isTripDetailsActive: boolean = true;

  constructor(private router: Router, private firestore: Firestore) {}

  ngOnInit(): void {}

  signOut() {
    const auth = getAuth();
    signOut(auth)
      .then((error) => {
        console.log('Sign out Successful:', error);

        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log('Sign out error:', error);
      });
  }
}
