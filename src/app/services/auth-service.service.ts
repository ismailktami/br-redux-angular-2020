import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import * as fromApp from '../app-reducer';
import {Store} from '@ngrx/store';
import {Authenticate, Logout} from '../shared-actions';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  path = 'http://localhost:9910/login';
  private username: string;
  roles: Array<string>;
  jwt: string;

  constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.State>) { }

  login(data) {
    return this.http.post('http://localhost:9910/login', data, {observe: 'response'});
  }
  saveToken(token) {
    localStorage.setItem('token', token);
    this.jwt = token;
    this.parseJwt();
  }

  parseJwt() {
    const jwtHelper = new JwtHelperService();
    const jwtObject = jwtHelper.decodeToken(this.jwt);
    this.username = jwtObject.sub;
    localStorage.setItem('username', this.username);
    this.roles = jwtObject.roles;
  }
  isAdmin() {
    return this.roles.indexOf('ADMIN') >= 0;
  }
  isUser() {
    return this.roles.indexOf('USER') >= 0;

  }
  isAuthenticated() {
    return this.roles;
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.roles = null;
    this.username = null;
    this.router.navigate(['login']);
    this.store.dispatch(new Logout());
  }
  loadToken() {
    if ( this.isAuth()) {
        this.username = localStorage.getItem('username');
        this.store.dispatch(new Authenticate(this.username));
    }
  }


  isAuth(): boolean {
    return localStorage.getItem('token') != null;
  }
  getJwtToken() {
    return localStorage.getItem('token');
  }
}
