import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as formGroup from './group.reducers';

export const getGroupState = createFeatureSelector<formGroup.State>(formGroup.groupsFeatureKey);

export const selectGroupData = createSelector(getGroupState, (state) => state.groups);

export const selectGroupsId = createSelector(getGroupState, (state) => state.groups.map((group) => group._id));

export const selectNewGroupData = createSelector(getGroupState, (state) => state.newGroups);
