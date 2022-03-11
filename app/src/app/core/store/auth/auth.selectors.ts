import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducers';

export const getAuthState = createFeatureSelector<fromAuth.State>(fromAuth.authFeatureKey);

export const selectError = createSelector(getAuthState, (state) => state.errorMessage);

export const selectIsLoggedIn = createSelector(getAuthState, (state) => state.loggedIn);
