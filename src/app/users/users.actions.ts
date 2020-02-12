import {Action} from '@ngrx/store';
import {UserForm} from './user-form.model';
import {User} from '../user/user.model';
import {Role} from '../user/role.model';

export  const LOADUSERS = '[USERS] LOADUSERS'  ;

export class LoadUsers implements Action {
  constructor(public users: User[]) {}
  readonly  type = LOADUSERS;
}
export  const LOADROLES = '[USERS] LOADROLES'  ;

export class LoadRoles implements Action {
  constructor(public roles: Role[], public user: number) {}
  readonly  type = LOADROLES;
}
export  const LOADALLROLES = '[USERS] LOADALLROLES'  ;

export class LoadAllRoles implements Action {
  constructor(public roles: Role[]) {}
  readonly  type = LOADALLROLES;
}



export  const ADDUSER = '[USERS] ADDUSER'  ;
export class AddUser implements Action {
  constructor(public user: User) {}
  readonly  type = ADDUSER;
}

export  const ADDUSERFAILED = '[USERS] ADDUSERFAILED'  ;
export class AddUserFailed implements Action {
  constructor(public error: string) {}
  readonly  type = ADDUSERFAILED;
}



export  const SELECTUSER = '[USERS] SELECTUSER'  ;
export class SelectUser implements Action {
  constructor(public user: User) {}
  readonly  type = SELECTUSER;
}

export const DELETEUSER = '[USERS] DELETEUSER';
export class DeleteUser implements Action {
  readonly type = DELETEUSER;
  constructor(public user: User){}
}


export type UsersActions = LoadUsers | AddUser |SelectUser |AddUserFailed |LoadRoles | LoadAllRoles  | DeleteUser;
