import { Action, createReducer, on } from '@ngrx/store';
import { AttractionFilter, FilterInput } from '../../models/attraction/attraction-filter.model';
import { Attraction } from '../../models/attraction/attration.model';
import {
  attractionError,
  filterChange,
  getAttractionsSuccess,
  getNewAttractionsSuccess,
  initializeFilters
} from './attraction.actions';

export interface State {
  attractions: Attraction[];
  filters: AttractionFilter | null;
  newAttractions: Attraction[];
  errorMessage: string;
}

export const initialState: State = {
  attractions: [],
  filters: null,
  newAttractions: [],
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
  const tempFilters = { ...filters };
  tempFilters[filterInput.key as keyof AttractionFilter] = filterInput;
  console.log(tempFilters);
  return tempFilters;
}
