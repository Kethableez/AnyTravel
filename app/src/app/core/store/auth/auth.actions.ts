import { createAction, props } from '@ngrx/store';
import { LoginPayload } from '../../models/user/login-payload';

export const login = createAction('[Auth] Login', props<{ loginPayload: LoginPayload }>());

export const loginSuccess = createAction(
  '[Auth] Login success',
  props<{ loggedIn: boolean; userId: string; token: string }>()
);

export const logout = createAction('[Auth] Logout');

export const authError = createAction('[Auth] Error', props<{ message: string }>());
