import { createReducer, on, Action } from '@ngrx/store';
import { User } from '@models/user/user.model';
import { changeDataSuccess, clearData, getDataSuccess, registerSuccess, userError } from './user.actions';

export interface State {
  user: User | null;
  errorMessage: string;
}

export const initialState: State = {
  user: null,
  errorMessage: ''
};

export const userReducer = createReducer(
  initialState,
  on(getDataSuccess, (state, action) => ({
    ...state,
    user: action.user,
    errorMessage: ''
  })),
  on(registerSuccess, (state) => ({
    ...state,
    errorMessage: ''
  })),
  on(changeDataSuccess, (state, action) => ({
    ...state,
    user: action.user
  })),
  on(clearData, () => ({
    ...initialState
  })),
  on(userError, (state, action) => ({
    ...state,
    errorMessage: action.message
  }))
);

export const userFeatureKey = 'user';

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}
