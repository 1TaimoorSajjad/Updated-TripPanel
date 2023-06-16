import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import {
  getAuth,
  onAuthStateChanged,
  browserSessionPersistence,
  setPersistence,
} from 'firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  user: any;

  constructor(private router: Router, private firestore: Firestore) {}
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
  isRegisterPage(): boolean {
    return this.router.url === '/register';
  }
  isEmptyURL(): boolean {
    return this.router.url === '/';
  }
  title = 'FinalBuild';

  ngOnInit(): void {
    const auth = getAuth();
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            this.router.navigate(['/']);
          } else {
            this.router.navigate(['/login']);
          }
        });
      })
      .catch((error) => {
        console.log('Error setting persistence:', error);
      });
  }
}
