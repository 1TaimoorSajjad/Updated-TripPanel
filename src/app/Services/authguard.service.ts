import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      // const auth = getAuth();
      // onAuthStateChanged(auth, (user) => {
      //   if (user) {
      resolve(true);
      //   } else {
      //     this.router.navigate(['/login']);
      //     resolve(false);
      //   }
      // });
    });
  }
}
