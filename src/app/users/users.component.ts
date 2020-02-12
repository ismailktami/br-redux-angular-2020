import { Component, OnInit } from '@angular/core';
import {ManageUserService} from '../services/manage-user.service';
import {HttpClient} from '@angular/common/http';
import {User} from '../user/user.model';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromApp from '../app-reducer';
import * as fromUsers from './users.reducer';
import {da_DK} from 'ng-zorro-antd';
@Component({
  selector: 'app-home',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  sortName: string | null = null;
  sortValue: string | null = null;
  searchValue = '';
  listOfSearchName: string[] = [];
  users: User[];
  constructor(private manageUsers: ManageUserService , private http: HttpClient, private router: Router,
              private store: Store<fromApp.State>, private store2: Store<fromUsers.State> ) { }

  ngOnInit() {
    this.loadUsers();
    this.store.select(fromApp.getAllUsers).subscribe(data => {
      this.users = data;
    });
  }

  removeUser(user: number ) {
    this.manageUsers.removeUser(user);
  }



  getStatu(u: boolean) {
    if (u) {
      return 'Bloquer';
    }
    return 'Débloquer';
  }
  getStatuColor(u: boolean) {
    if (u) {
      return 'danger';
    }
    return 'primary';
  }
  switchStatu(data: User) {
    if (data.actived) {
        this.bloque(data.username);
    } else {
      this.debloquer(data.username);
    }

  }
  loadUsers() {
    this.manageUsers.getAllUser();
  }
  loadRoles(id: number) {
    console.log(id);
  }

  bloque(user: string) {
    this.manageUsers.bloqueUser(user).subscribe(data => {console.log(data); });
  }
  debloquer(user: string) {
    this.manageUsers.debloquerUser(user).subscribe(data => {console.log(data); });

  }
  reset(): void {
    this.searchValue = '';
  }

  sort(sortName: string, value: string): void {
    this.sortName = sortName;
    this.sortValue = value;
    this.search();
  }

  filterNameChange(value: string[]): void {
    this.listOfSearchName = value;
    this.search();
  }

  search(): void {
    const filterFunc = (item: User ) => {
      return (
        (this.listOfSearchName.length
          ? this.listOfSearchName.some(name => item.username.indexOf(name) !== -1)
          : true) && item.username.indexOf(this.searchValue) !== -1
      );
    };
    const data = this.users.filter((item: User) => filterFunc(item));

    this.users = data.sort((a, b) =>
      this.sortValue === 'ascend'
        ? a[this.sortName!] > b[this.sortName!]
        ? 1
        : -1
        : b[this.sortName!] > a[this.sortName!]
        ? 1
        : -1
    );


  }




}
