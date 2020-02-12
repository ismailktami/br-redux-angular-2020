import { Component, OnInit } from '@angular/core';
import {User} from '../user/user.model';
import {Store} from '@ngrx/store';
import * as fromApp from '../app-reducer';
import {Observable} from 'rxjs';
import {Reset, Signup} from './signup.actions';
import { Router} from '@angular/router';
import {UserSignup} from '../user/user-signup.model';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user$: Observable<UserSignup> ;
  user: UserSignup;
  constructor(private  store: Store<fromApp.State>, private router: Router) { }

  ngOnInit() {

    this.user$ = this.store.select(fromApp.getAttemptUser);
  }


  signup(user: UserSignup) {
      this.store.dispatch(new Signup(user));
      this.router.navigate(['login']);
  }
  reset() {
    this.store.dispatch(new Reset());
  }

}
