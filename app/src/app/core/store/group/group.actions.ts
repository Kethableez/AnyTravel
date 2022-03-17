import { createAction, props } from '@ngrx/store';
import { Group } from '../../models/group/group.model';

export const getData = createAction('[Group] Fetch data');
export const getDataSuccess = createAction('[Group] Fetch data success', props<{ group: Group[] }>());

export const clearData = createAction('[Group] Clear data');

export const userError = createAction('[Group] Error', props<{ message: string }>());
