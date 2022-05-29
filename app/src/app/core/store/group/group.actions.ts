import { createAction, props } from '@ngrx/store';
import { Group } from '../../models/group/group.model';
import { CreateGroupPayload } from '../../models/group/crate-group-payload';
import { EditGroupPayload } from '../../models/group/edit-group-payload';

export const getUserGroups = createAction('[Group] Fetch user groups');
export const getNewGroup = createAction('[Group] Fetch new data');
export const getUserGroupsSuccess = createAction('[Group] Fetch user groups success', props<{ groups: Group[] }>());
export const getNewGroupSuccess = createAction('[Group] Get new group success', props<{ groups: Group[] }>());

export const deleteGroup = createAction('[Group] Delete Group', props<{ groupId: string }>());
export const createGroup = createAction(
  '[Group] Create Group',
  props<{ file: FormData; payload: CreateGroupPayload }>()
);
export const editGroup = createAction('[Group] Edit Group', props<{ groupId: string; payload: EditGroupPayload }>());
export const addUserToGroup = createAction('[Group] Add User to Group', props<{ groupId: string, payload: string }>());

export const groupError = createAction('[Group] Error', props<{ message: string }>());
