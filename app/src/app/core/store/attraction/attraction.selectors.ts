import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAttraction from './attraction.reducers';

export const getAttractionState = createFeatureSelector<fromAttraction.State>(fromAttraction.attractionFeatureKey);

export const selectAttractions = createSelector(getAttractionState, (state) => state.attractions);

export const selectNewAttractions = createSelector(getAttractionState, (state) => state.newAttractions);
