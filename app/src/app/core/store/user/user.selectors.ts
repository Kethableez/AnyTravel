import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as formUser from './user.reducers';

export const getUserState = createFeatureSelector<formUser.State>(formUser.userFeatureKey);

export const selectUserData = createSelector(getUserState, (state) => state.user);
