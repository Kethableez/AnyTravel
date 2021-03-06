import { createReducer, on, Action } from '@ngrx/store';
import { Group } from '../../models/group/group.model';
import { deleteGroup, getUserGroupsSuccess, groupError } from './group.actions';

export interface State {
  groups: Group[];
  newGroups: Group[];
  errorMessage: string;
}
export const initialState: State = {
  groups: [],
  newGroups: [],
  errorMessage: ''
};

export const groupsReducer = createReducer(
  initialState,
  on(getUserGroupsSuccess, (state, action) => ({
    ...state,
    groups: action.groups,
    errorMessage: ''
  })),
  on(groupError, (state, action) => ({
    ...state,
    errorMessage: action.message
  }))
);

export const groupsFeatureKey = 'groups';

export function reducer(state: State | undefined, action: Action) {
  return groupsReducer(state, action);
}
