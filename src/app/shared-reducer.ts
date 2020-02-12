import {AUTHENTICATE, UNAUTHENTICATE, SharedActions} from './shared-actions';

export interface State {
  isAuthenticated: boolean;
  username: string;
}

const initialState: State = {
  isAuthenticated: false,
  username: null
};



export function sharedReducer(state = initialState, action: SharedActions) {

    switch (action.type) {
      case AUTHENTICATE : {
          return{
            isAuthenticated: true,
            username: action.username
          };
      }
      case UNAUTHENTICATE : {
        return{
          isAuthenticated: false,
          username: null
        };
      }
      default : {
        return state;
    }
    }

}
