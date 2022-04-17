import { createFeatureSelector, createSelector } from '@ngrx/store';
import { isMatch, sortSelector } from '@helpers/attraction-filter.helpers';
import { AttractionFilter } from '@models/attraction/attraction-filters/attraction-filter.model';
import * as fromAttraction from './attraction.reducers';

export const getAttractionState = createFeatureSelector<fromAttraction.State>(fromAttraction.attractionFeatureKey);

export const selectAttractions = createSelector(getAttractionState, (state) => state.attractions);

export const selectNewAttractions = createSelector(getAttractionState, (state) => state.newAttractions);

export const selectAttractionFilters = createSelector(getAttractionState, (state) => state.filters);

export const selectFilters = createSelector(getAttractionState, (state) =>
  Object.values(state.filters as AttractionFilter)
);

export const selectSortingType = createSelector(getAttractionState, (state) => state.sortType);

export const selectSearchQuery = createSelector(getAttractionState, (state) => state.searchQuery);

export const selectFilteredAttractions = createSelector(
  selectAttractions,
  selectFilters,
  selectSortingType,
  selectSearchQuery,
  (attractions, filters, sortType, query) =>
    attractions
      .filter((attraction) => isMatch(attraction, filters))
      .sort((a, b) => sortSelector(sortType, a, b))
      .filter((a) => (query ? a.name.toLowerCase().includes(query.toLowerCase()) : true))
);
