import { SortOptions } from '@models/journey/sort-options.model';
import { createReducer, on } from '@ngrx/store';
import { getUserJourneySuccess, journeyError, searchQueryChange, sortChange } from '../actions/journeys.actions';

export interface State {
  journeys: any[];
  sortType: string;
  searchQuery: string | null;
  errorMessage: string;
}

export const initialState: State = {
  journeys: [],
  sortType: SortOptions.NAME_ASC,
  searchQuery: null,
  errorMessage: ''
};

export const journeysReducer = createReducer(
  initialState,
  on(getUserJourneySuccess, (state, action) => ({
    ...state,
    journeys: action.journeys
  })),
  on(sortChange, (state, action) => ({
    ...state,
    sortType: action.option
  })),
  on(searchQueryChange, (state, action) => ({
    ...state,
    searchQuery: action.query
  })),
  on(journeyError, (state, action) => ({
    ...state,
    errorMessage: action.message
  }))
);

export const journeysFeatureKey = 'journeys';

export function reducer(state: State | undefined, action: any) {
  return journeysReducer(state, action);
}
