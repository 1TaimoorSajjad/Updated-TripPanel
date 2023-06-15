import { Component, OnInit } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  login() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then(() => {
        console.log('Login successful');
        this.router.navigate(['/Trip/Create']);
      })
      .catch((error) => {
        console.log('Error logging in:', error);
      });
  }
}
