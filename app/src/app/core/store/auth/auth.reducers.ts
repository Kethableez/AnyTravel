import { Action, createReducer, on } from '@ngrx/store';
import { authError, loginSuccess, logout, refresh, refreshError, refreshSuccess } from './auth.actions';

export interface State {
  loggedIn: boolean;
  inProgress: boolean;
  userId: string | null;
  authToken: string | null;
  errorMessage: string;
}

export const initialState: State = {
  loggedIn: false,
  inProgress: false,
  userId: null,
  authToken: null,
  errorMessage: ''
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => ({
    ...state,
    loggedIn: action.loggedIn,
    userId: action.userId,
    authToken: action.authToken,
    errorMessage: ''
  })),
  on(refresh, (state) => ({
    ...state,
    inProgress: true
  })),
  on(refreshSuccess, (state, action) => ({
    ...state,
    inProgress: false,
    authToken: action.authToken
  })),
  on(logout, () => ({
    ...initialState
  })),
  on(authError, (state, action) => ({
    ...state,
    inProgress: false,
    errorMessage: action.message
  }))
);

export const authFeatureKey = 'auth';

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
