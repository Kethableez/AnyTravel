import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as User from './user.reducers';

export const getUserState = createFeatureSelector<User.State>(User.userFeatureKey);

export const selectUserData = createSelector(getUserState, (state) => state.user);

export const selectUserId = createSelector(getUserState, (state) => state?.user?._id);

export const selectUserRole = createSelector(getUserState, (state) => state.user?.role);

export const isUserModerator = createSelector(getUserState, (state) => state.user?.role === 'Moderator');
