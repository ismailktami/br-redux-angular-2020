import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as fromApp from '../app-reducer';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {User} from '../user/user.model';
import {HttpClient} from '@angular/common/http';
import {AuthServiceService} from '../services/auth-service.service';
import {Authenticate, UnAuthenticate} from '../shared-actions';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isAuthenticate$: Observable<boolean>;
  error: string;
  constructor(private store: Store<fromApp.State>, private router: Router, private  http: HttpClient, private  authenticationService: AuthServiceService) {}
  ngOnInit() {

  }
  logout() {
    this.authenticationService.logout();
    this.store.dispatch(new UnAuthenticate());
  }
  login(user: User) {
    this.authenticationService.login(user).subscribe(
      data => {
        if (data.headers.get('Authorization') != null) {
          this.authenticationService.saveToken(data.headers.get('Authorization'));
          this.store.dispatch(new Authenticate(user.username));
          this.router.navigate(['home']);
          this.error = null;
        }
      }
      , err => {

        if (err.status === 404) {
          this.error = 'Bad Credentials';
        }
        if (err.status === 401) {
          this.error = 'Compte bloqued';
        }
      }) ;  }


}
