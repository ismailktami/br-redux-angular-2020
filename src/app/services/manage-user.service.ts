import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {PATHBACKEND} from './ConstProject';
import {Store} from '@ngrx/store';
import * as fromApp from '../app-reducer';
import {AddUser, AddUserFailed, DeleteUser, LoadAllRoles, LoadRoles, LoadUsers} from '../users/users.actions';
import {User} from '../user/user.model';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Role} from '../user/role.model';
@Injectable({
  providedIn: 'root'
})
export class ManageUserService {

  constructor(private http: HttpClient, private store: Store<fromApp.State>) { }

  getAllUser() {
    return this.http.get('http://localhost:9910/users', {responseType: 'json'}).subscribe(data => {
      this.store.dispatch(new LoadUsers(data as User[]));
    });
  }
  getAllRoles() {
    return this.http.get('http://localhost:9910/roles', {responseType: 'json'}).subscribe(data => {
       this.store.dispatch(new LoadAllRoles((data as Role[])));
    });
  }
  bloqueUser(username: string ) {
    return this.http.post(PATHBACKEND + '/users/' + username + '/bloquer', null, {responseType: 'json'});
  }
  debloquerUser(username: string) {
    return this.http.post(PATHBACKEND + '/users/' + username + '/debloquer', null, {responseType: 'json'});

  }
  getRolesByUser(user ) {
     this.http.get('http://localhost:9910/users/' + user + '/roles', {responseType: 'json'}).subscribe(data => {
      this.store.dispatch(new LoadRoles(data as Role[] , user ));
     });
     this.getAllRoles();
  }
  revokeRolefromUser(roleName: string , idUser: number ) {
    return this.http.get(PATHBACKEND + '/users/' + idUser + '/revoke/' + roleName).subscribe(data => {
      this.store.dispatch(new LoadRoles((data as User).roles , idUser ));
    });
  }

  addUser(form) {
    return this.http.post(PATHBACKEND + '/register',  form, {responseType: 'json'})
      .subscribe(data => {this.store.dispatch(new AddUser(data as User )); }
      , error1 => {console.log(error1); this.store.dispatch(new AddUserFailed(error1)); });
  }

  addRoleToUser(username: string , roleName: string) {
    this.http.get(PATHBACKEND + '/users/' + username + '/addRole/' + roleName).subscribe(data => {
        this.store.dispatch(new LoadRoles(((data as User).roles), (data as User).id)); });
  }
  removeUser(user: number) {
    this.http.delete(PATHBACKEND + '/users/' + user, {responseType: 'json'}).subscribe(data => {
      console.log(data);
      this.store.dispatch(new DeleteUser((data as User)));
    });
  }

}
