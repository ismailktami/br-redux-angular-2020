import {Action, ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromLoginReducer from './login/login.reducer';
import * as fromSignupReducer from './signup/signup.reducer';
import * as fromSharedReducer from '../app/shared-reducer';
import * as fromUsersReducer from '../app/users/users.reducer';
import {LOGOUT} from './shared-actions';
export interface State {
  login: fromLoginReducer.State;
  signup: fromSignupReducer.State;
  shared: fromSharedReducer.State;
  users: fromUsersReducer.State;
}


export const reducers: ActionReducerMap<State> = {
  login: fromLoginReducer.loginReducer,
  signup: fromSignupReducer.signupReducer,
  users: fromUsersReducer.usersReducer,
  shared: fromSharedReducer.sharedReducer,
};

export const getLoginState = createFeatureSelector<fromLoginReducer.State>('login');
export const getIsAuthenticate = createSelector(getLoginState,
    loginstate => loginstate.isAuthenticate) ;
export const getSignupState = createFeatureSelector<fromSignupReducer.State>('signup');

export const getAttemptUser = createSelector(getSignupState,
  loginstate => loginstate.user) ;

export const getSharedState = createFeatureSelector<fromSharedReducer.State>('shared');


export function AppReducer(state, action) {
  if (action.type ===  LOGOUT) {
    state = undefined;
  }
  // return reducer(state, action);
}


export const isAuthenticate = createSelector(getSharedState, s1 => s1.isAuthenticated);
export const getUsername = createSelector(getSharedState, s1 => s1.username);
export const getUsersState = createFeatureSelector<fromUsersReducer.State>('users');
export const getAllUsers = createSelector(getUsersState, s1 => s1.users) ;
export const getRoles = createSelector(getUsersState, s1 => s1.roles);
export const getAllRoles = createSelector(getUsersState, s1 => s1.Allroles);
export const getCurrentUser = createSelector(getUsersState, s1 => s1.currentUser);
export const getErroAdd = createSelector(getUsersState, s1 => s1.error);
