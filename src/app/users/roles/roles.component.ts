import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ManageUserService} from '../../services/manage-user.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../../app-reducer';
import {Role} from '../../user/role.model';
import {getAllRoles} from '../../app-reducer';
import * as _ from 'lodash';
import {User} from '../../user/user.model';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class RolesComponent implements OnInit {
  roles: Role[];
  id: number;
  inputValue: string;
  roleName: string;
  currentUser: User;
  optionGroups: Role[] = [];
  constructor(private route: ActivatedRoute , private service: ManageUserService , private store: Store<fromApp.State>) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params ) => {
        this.id = params.id;
        this.loadRoles();
    });
    this.store.select(fromApp.getRoles).subscribe(data => {
      this.roles = data;
    });
    this.store.select(fromApp.getAllRoles).subscribe(data => {
      this.optionGroups = _.differenceBy(data, this.roles, 'roleName');
    });
    this.store.select(fromApp.getCurrentUser).subscribe(data=>{
      this.currentUser = data;
    });
  }
  onChange(value: string): void {
    console.log(this.roleName);
  }
  revokeRole(roleName: string) {
    this.service.revokeRolefromUser(roleName, this.currentUser.id);
  }

  loadRoles() {
    this.service.getRolesByUser(this.route.snapshot.params.id);
  }
  getAllRoles() {
    this.service.getAllRoles();
  }
  addRoleToUser() {
    this.service.addRoleToUser(this.currentUser.username , this.roleName);
  }
}
