import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';

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
    this.user = auth.currentUser;
    console.log(auth);
    const user = auth.currentUser;
    console.log('user', user);
  }
}
