import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  deleteDoc,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users!: Observable<any[]>;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const collectionRef = collection(this.firestore, 'logincred');
    this.getUsers(collectionRef);
  }

  async getUsers(collectionRef: any): Promise<void> {
    this.users = collectionData(collectionRef);
  }
}
