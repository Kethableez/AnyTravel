import { Action, createReducer, on } from '@ngrx/store';
import { authError, loginSuccess, logout, registerSuccess } from './auth.actions';

export interface State {
  loggedIn: boolean;
  userId: string | null;
  errorMessage: string;
}

export const initialState: State = {
  loggedIn: false,
  userId: null,
  errorMessage: ''
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => ({
    ...state,
    loggedIn: action.loggedIn,
    userId: action.userId,
    errorMessage: ''
  })),
  on(registerSuccess, (state) => ({
    ...state,
    errorMessage: ''
  })),
  on(logout, () => ({
    ...initialState
  })),
  on(authError, (state, action) => ({
    ...state,
    errorMessage: action.message
  }))
);

export const authFeatureKey = 'auth';

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
