import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AttractionFilter } from '../../models/attraction/attraction-filter.model';
import * as fromAttraction from './attraction.reducers';

export const getAttractionState = createFeatureSelector<fromAttraction.State>(fromAttraction.attractionFeatureKey);

export const selectAttractions = createSelector(getAttractionState, (state) => state.attractions);

export const selectNewAttractions = createSelector(getAttractionState, (state) => state.newAttractions);

export const selectAttractionFilters = createSelector(getAttractionState, (state) => state.filters);

export const selectFilters = createSelector(getAttractionState, (state) =>
  Object.values(state.filters as AttractionFilter)
);
