import {Action} from '@ngrx/store';
import {AuthServiceService} from './services/auth-service.service';

export  const AUTHENTICATE = '[SHARED] ISAUTHENTICATE'  ;

export class Authenticate implements Action {
  readonly  type = AUTHENTICATE;
  constructor(public username: string ) { }
}

export  const UNAUTHENTICATE = '[SHARED] UNAUTHENTICATE'  ;
export class UnAuthenticate implements Action {
  readonly  type = UNAUTHENTICATE;
}

export const  LOGOUT = '[App] LOGOUT';
export class Logout implements Action {
  readonly type = LOGOUT;
}

export type SharedActions = Authenticate | UnAuthenticate |Logout ;
