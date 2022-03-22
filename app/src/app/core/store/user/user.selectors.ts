import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as formUser from './user.reducers';

export const getUserState = createFeatureSelector<formUser.State>(formUser.userFeatureKey);

export const selectUserData = createSelector(getUserState, (state) => state.user);

export const selectUserId = createSelector(getUserState, (state) => state?.user?._id);

export const selectUserRole = createSelector(getUserState, (state) => state.user?.role);

export const isUserModerator = createSelector(getUserState, (state) => state.user?.role === 'Moderator');
