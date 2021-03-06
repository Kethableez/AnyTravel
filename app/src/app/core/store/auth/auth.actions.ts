import { createAction, props } from '@ngrx/store';
import { ConfirmPayload } from '@models/auth/confirm-payload.model';
import { LoginPayload } from '@models/user/login-payload';

export const login = createAction('[Auth] Login', props<{ loginPayload: LoginPayload }>());

export const loginSuccess = createAction(
  '[Auth] Login success',
  props<{ loggedIn: boolean; userId: string; authToken: string }>()
);

export const loginError = createAction('[Auth] Login error', props<{ error: string }>());

export const refresh = createAction('[Auth] Refresh token');

export const refreshSuccess = createAction('[Auth] Refresh token success', props<{ authToken: string }>());

export const refreshError = createAction('[Auth] Refresh token error', props<{ message: string }>());

export const logout = createAction('[Auth] Logout');

export const confirm = createAction('[Auth] Confirm', props<{ payload: ConfirmPayload }>());

export const logoutSuccess = createAction('[Auth] Logout success');

export const logoutError = createAction('[Auth] Logout error', props<{ error: string }>());

export const authError = createAction('[Auth] Error', props<{ message: string; dispatchNotification: boolean }>());
