import {Action} from '@ngrx/store';
import {User} from '../user/user.model';
import {UserSignup} from '../user/user-signup.model';
export  const SIGNUP = '[SIGNUP] SIGNUP'  ;
export  const RESET   = '[SIGNUP] RESET';

export class Signup implements Action {
  constructor(public user: UserSignup) {}
  readonly  type = SIGNUP;
}
export class Reset implements Action {
  readonly  type = RESET;
}


export type SignupActions = Signup | Reset ;
