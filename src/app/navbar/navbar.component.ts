import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromAPP from '../app-reducer';
import {AuthServiceService} from '../services/auth-service.service';
import {Observable, Subject} from 'rxjs';
import {UnAuthenticate} from '../shared-actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  visible = false;
  placement = 'left';
  isAutheticate: boolean;
  username: string;
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  constructor(private router: Router , private  store: Store<fromAPP.State> , private auth: AuthServiceService) { }

  ngOnInit() {
     this.store.select(fromAPP.isAuthenticate).subscribe(data => {
        this.isAutheticate = data;
      });

     this.store.select(fromAPP.getUsername).subscribe(data => {
        this.username = data;
      });

  }
  logout() {
    this.auth.logout();
    this.store.dispatch(new UnAuthenticate());
  }



}
