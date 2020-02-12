import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthServiceService} from './auth-service.service';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(public authService: AuthServiceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (localStorage.getItem('token')) {
      console.log(localStorage.getItem('token'));
      req = req.clone({
        setHeaders: {
          Authorization: localStorage.getItem('token')
        }
      } );
    }

    return next.handle(req).pipe(catchError(err => {
      return Observable.throw(err); }
      ));
  }
}


