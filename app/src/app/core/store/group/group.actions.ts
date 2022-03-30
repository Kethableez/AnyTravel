import { createAction, props } from '@ngrx/store';
import { Group } from '../../models/group/group.model';
import { CreateGroupPayload } from '../../models/group/crate-group-payload';

export const getData = createAction('[Group] Fetch data');
export const getNewGroup = createAction('[Group] Fetch new data');
export const getDataSuccess = createAction('[Group] Fetch data success', props<{ groups: Group[] }>());
export const getNewGroupSuccess = createAction('[Group] Get new group success', props<{ groups: Group[] }>());


export const clearData = createAction('[Group] Clear data');
export const createGroup = createAction('[Group] Create Group', props<{ payload: CreateGroupPayload }>());

export const groupError = createAction('[Group] Error', props<{ message: string }>());

