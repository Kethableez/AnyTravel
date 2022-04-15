import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducers';

export const selectAuth = createFeatureSelector<fromAuth.State>(fromAuth.authFeatureKey);

export const selectAuthState = createSelector(selectAuth, (state) => state);

export const selectError = createSelector(selectAuth, (state) => state.errorMessage);

export const selectIsLoggedIn = createSelector(selectAuth, (state) => state.loggedIn);

export const selectAuthToken = createSelector(selectAuth, (state) => state.authToken);

export const selectCurrentUserId = createSelector(selectAuth, (state) => state.userId);
