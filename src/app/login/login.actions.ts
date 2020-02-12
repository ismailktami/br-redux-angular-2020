import {Action} from '@ngrx/store';
import {User} from '../user/user.model';

export const AUTHENTICATE = '[LOGIN] AUTHENTICATE' ;
export const UNAUTHENTICATE = '[LOGIN] UNAUTHENTICATE' ;



export class Authenticate implements Action {
  readonly type = AUTHENTICATE;
  constructor(public user: User ) {}
}

export class UnAuthenticate implements Action {
  readonly type = UNAUTHENTICATE;
}

export type LoginActions = Authenticate |UnAuthenticate;
