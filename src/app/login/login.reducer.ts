import {Action} from '@ngrx/store';
import {LoginActions, AUTHENTICATE, UNAUTHENTICATE} from './login.actions';
import {User} from '../user/user.model';

export interface State {
  isAuthenticate: boolean;
  user: User;
}
const initialState: State = {
  isAuthenticate : (localStorage.getItem('isAuthenticated') != null),
  user: null
};


export function loginReducer(state = initialState, action: LoginActions) {
  switch (action.type) {
    case AUTHENTICATE :
      localStorage.setItem('isAuthenticated', action.user.username);
      {
      return {
          user: null ,
          isAuthenticate: true
        };

    }
    case UNAUTHENTICATE : {
      localStorage.removeItem('isAuthenticated');

      return {
        isAuthenticate: false,
        user: null
    };
    }

    default : {
      return {
        isAuthenticate: state.isAuthenticate,
        user: null
      };
    }
  }

}

export const getIsAuthenticate = (state: State ) => state.isAuthenticate;
