import {User} from '../user/user.model';
import {SignupActions, SIGNUP, RESET } from './signup.actions';
import {UserSignup} from '../user/user-signup.model';

export interface State {
    user: UserSignup;
}
const  initialState: State = {
    user : {
      username: null,
      password: null
    }
};


export function signupReducer(state = initialState, action: SignupActions) {

   switch (action.type) {
     case SIGNUP : {
       state.user = action.user;
       return {
         user : action.user
       };
     }
     case RESET : {
       state.user = null;

       return {
         user : state.user
       };

     }
     default : {
       return {
         user : {
           username: state.user.username,
           password: state.user.password
         }
       };
     }
   }
}


const getUserAttemptConnect = (state: State) => state.user;
