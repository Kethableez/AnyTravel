import { Action, createReducer, on } from '@ngrx/store';
import { AttractionFilter } from '@models/attraction/attraction-filters/attraction-filter.model';
import { FilterInput } from '@models/attraction/attraction-filters/filter-input.model';
import { SortOptions } from '@models/attraction/attraction-filters/sort-options.model';
import { Attraction } from '@models/attraction/attration.model';
import {
  attractionError,
  filterChange,
  getAttractionsSuccess,
  getNewAttractionsSuccess,
  initializeFilters,
  searchQueryChange,
  sortChange
} from './attraction.actions';

export interface State {
  attractions: Attraction[];
  filters: AttractionFilter | null;
  sortType: SortOptions;
  searchQuery: string | null;
  newAttractions: Attraction[];
  errorMessage: string;
}

export const initialState: State = {
  attractions: [],
  newAttractions: [],
  filters: null,
  searchQuery: null,
  sortType: SortOptions.NAME_ASC,
  errorMessage: ''
};

export const attractionReducer = createReducer(
  initialState,
  on(getAttractionsSuccess, (state, action) => ({
    ...state,
    attractions: action.attractions,
    errorMessage: ''
  })),
  on(getNewAttractionsSuccess, (state, action) => ({
    ...state,
    newAttractions: action.attractions,
    errorMessage: ''
  })),
  on(initializeFilters, (state, action) => ({
    ...state,
    filters: action.filters
  })),
  on(filterChange, (state, action) => ({
    ...state,
    filters: updateFilters(state.filters as AttractionFilter, action.filterInput)
  })),
  on(sortChange, (state, action) => ({
    ...state,
    sortType: action.option
  })),
  on(searchQueryChange, (state, action) => ({
    ...state,
    searchQuery: action.query
  })),
  on(attractionError, (state, action) => ({
    ...state,
    errorMessage: action.message
  }))
);

export const attractionFeatureKey = 'attraction';

export function reducer(state: State | undefined, action: Action) {
  return attractionReducer(state, action);
}

function updateFilters(filters: AttractionFilter, filterInput: FilterInput) {
  const tempFilters = {
    ...filters,
    [filterInput.key]: filterInput
  };

  return tempFilters;
}
