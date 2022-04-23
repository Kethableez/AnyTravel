import { createReducer } from '@ngrx/store';

export interface State {
  newJourneys: any[];
  incomingJourneys: any[];
  pastJourneys: any[];
  sortType: string;
  searchQuery: string | null;
  errorMessage: string;
}

export const initialState: State = {
  newJourneys: [],
  incomingJourneys: [],
  pastJourneys: [],
  sortType: 'nameAsc',
  searchQuery: null,
  errorMessage: ''
};

export const journeysReducer = createReducer(initialState);

export const journeysFeatureKey = 'journeys';

export function reducer(state: State | undefined, action: any) {
  return journeysReducer(state, action);
}
