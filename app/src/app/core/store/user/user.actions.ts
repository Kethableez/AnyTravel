import { createAction, props } from '@ngrx/store';
import { User } from '@models/user/user.model';
import { RegisterPayload } from '@models/user/register-payload';

export const register = createAction('[User] Register', props<{ registerPayload: RegisterPayload }>());

export const registerSuccess = createAction('[User] Register success');

export const getData = createAction('[User] Fetch data');

export const getDataSuccess = createAction('[User] Fetch data success', props<{ user: User }>());

export const changeData = createAction('[User] Change data', props<{ changePayload: any }>());

export const changeAvatar = createAction('[User] Change avatar', props<{ file: FormData }>());

export const changeDataSuccess = createAction('[User] Change data success', props<{ user: any }>());

export const deleteAccount = createAction('[User] Delete account', props<{ payload: any }>());

export const deleteAccountSuccess = createAction('[User] Delete account success');

export const clearData = createAction('[User] Clear data');

export const userError = createAction('[User] Error', props<{ message: string; dispatchNotification: boolean }>());
