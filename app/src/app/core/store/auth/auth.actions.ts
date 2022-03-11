import { createAction, props } from '@ngrx/store';
import { LoginPayload } from '../../models/user/login-payload';
import { RegisterPayload } from '../../models/user/register-payload';

export const login = createAction('[Auth] Login', props<{ loginPayload: LoginPayload }>());

export const loginSuccess = createAction(
  '[Auth] Login success',
  props<{ loggedIn: boolean; userId: string; token: string }>()
);

export const register = createAction('[Auth] Register', props<{ registerPayload: RegisterPayload }>());

export const registerSuccess = createAction('[Auth] Register success');

export const logout = createAction('[Auth] Logout');

export const authError = createAction('[Auth] Error', props<{ message: string }>());
