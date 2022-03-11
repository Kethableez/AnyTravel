import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user/user.model';

export const getData = createAction('[User] Fetch data');

export const getDataSuccess = createAction('[User] Fetch data success', props<{ user: User }>());

// export const editUser = createAction('[User] Edit user', props<{ data: any }>());

// export const editUserSuccess = createAction('[User] Edit user success', props<{ changedUser: any }>());

export const clearData = createAction('[User] Clear data');

export const userError = createAction('[User] Error', props<{ message: string }>());
