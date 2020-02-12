import {Component, EventEmitter, OnInit} from '@angular/core';
import {ManageUserService} from '../../services/manage-user.service';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromApp from '../../app-reducer';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  private error: string;
  constructor(private manageService: ManageUserService, private store: Store<fromApp.State>) { }

  ngOnInit() {
    this.store.select(fromApp.getErroAdd).subscribe(value => {
      this.error = value;
    });
  }
  createUser(form: NgForm ) {
    this.manageService.addUser(form.value);
    form.reset();
  }

}
