import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as formGroup from './group.reducers';

export const getGroupState = createFeatureSelector<formGroup.State>(formGroup.groupsFeatureKey);

export const selectGroupData = createSelector(getGroupState, (state) => state.groups);
