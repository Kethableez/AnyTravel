import { DisplayType } from '@models/journey/display-type.model';
import { createReducer, on } from '@ngrx/store';
import {
  displayTypeChange,
  getNotificationsSuccess,
  getUserJourneySuccess,
  journeyError,
  searchQueryChange
} from '../actions/journeys.actions';

export interface State {
  journeys: any[];
  notifications: any[];
  displayType: DisplayType;
  searchQuery: string | null;
  errorMessage: string;
}

export const initialState: State = {
  journeys: [],
  notifications: [],
  displayType: DisplayType.ALL,
  searchQuery: null,
  errorMessage: ''
};

export const journeysReducer = createReducer(
  initialState,
  on(getUserJourneySuccess, (state, action) => ({
    ...state,
    journeys: action.journeys
  })),
  on(displayTypeChange, (state, action) => ({
    ...state,
    displayType: action.option
  })),
  on(getNotificationsSuccess, (state, action) => ({
    ...state,
    notifications: action.notifications
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
