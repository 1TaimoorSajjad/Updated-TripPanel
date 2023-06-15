import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users!: Observable<any[]>;
  isUserViewVisible = false;
  selectedUser: any;

  constructor(private firestore: Firestore, private router: Router) {}

  ngOnInit(): void {
    const collectionRef = collection(this.firestore, 'logincred');
    this.getUsers(collectionRef);
  }

  async getUsers(collectionRef: any): Promise<void> {
    this.users = collectionData(collectionRef);
  }

  viewUser(user: any) {
    this.isUserViewVisible = true;
    this.selectedUser = user;
  }

  closeView() {
    this.isUserViewVisible = false;
    this.selectedUser = null;
  }
}
