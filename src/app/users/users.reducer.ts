import {User} from '../user/user.model';
import {Role} from '../user/role.model';
import {ADDUSER, ADDUSERFAILED, DELETEUSER, LOADALLROLES, LOADROLES, LOADUSERS, SELECTUSER, UsersActions} from './users.actions';
import * as _ from 'lodash';
export interface State {
  users: User[];
  roles: Role[];
  Allroles: Role[];
  currentUser: User;
  error: string;
}

const initialState: State = {
   users: [],
   roles: [],
   Allroles: [] ,
   currentUser: null,
   error: null
};
export function usersReducer(state = initialState, action: UsersActions) {

  switch (action.type) {
    case LOADUSERS : {
      return{
        users: action.users,
        roles: [],
        Allroles: state.Allroles ,
        currentUser: null,
        error: null
      };
    }
    case LOADROLES : {
       return{
        users: state.users,
        roles: action.roles,
         Allroles: state.Allroles ,
         currentUser: _.find(state.users, e => e.id == action.user ) ,
         error: null
      };
    }
    case LOADALLROLES : {
      return{
        users: state.users,
        roles: state.roles,
        Allroles: action.roles ,
        currentUser: state.currentUser,
        error: null
      };
    }
    case ADDUSER : {

      state.users.push(action.user);
      console.log(state.users);
      return{
        users: state.users,
        roles: action.user.roles,
        Allroles: state.Allroles ,
        currentUser: null,
        error: null
      };
    }
    case ADDUSERFAILED : {
      return{
        users: state.users,
        roles: null,
        Allroles: state.Allroles ,
        currentUser: null,
        error: action.error

      };
    }

    case SELECTUSER : {
      return{
        users: state.users,
        roles: action.user.roles,
        Allroles: state.Allroles ,
        currentUser: action.user,
        error: null
      };
    }
    case DELETEUSER : {
      state.users = _.remove(state.users, e => e.id == action.user.id);
      return{
        users: state.users,
        roles: null,
        Allroles: state.Allroles ,
        currentUser: action.user,
        error: null
      };
    }
    default : {
     return state;
    }
  }

}
