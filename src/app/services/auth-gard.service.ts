import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthServiceService} from './auth-service.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../app-reducer';
@Injectable({
  providedIn: 'root'
})
export class AuthGardService implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router, private store: Store<fromApp.State>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authService.isAuth()) {
      this.router.navigate(['login']);
    } else {
      return true;
    }
  }
}
