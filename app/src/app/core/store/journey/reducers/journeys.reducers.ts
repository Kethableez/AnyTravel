import { createReducer, on } from '@ngrx/store';
import { getUserJourneySuccess, journeyError } from '../actions/journeys.actions';

export interface State {
  journeys: any[];
  sortType: string;
  searchQuery: string | null;
  errorMessage: string;
}

export const initialState: State = {
  journeys: [],
  sortType: 'nameAsc',
  searchQuery: null,
  errorMessage: ''
};

export const journeysReducer = createReducer(
  initialState,
  on(getUserJourneySuccess, (state, action) => ({
    ...state,
    journeys: action.journeys
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
