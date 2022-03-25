import { Action, createReducer, on } from '@ngrx/store';
import { AttractionFilter } from '../../models/attraction/attraction-filter.model';
import { Attraction } from '../../models/attraction/attration.model';
import { attractionError, getAttractionsSuccess, getNewAttractionsSuccess } from './attraction.actions';

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
  on(attractionError, (state, action) => ({
    ...state,
    errorMessage: action.message
  }))
);

export const attractionFeatureKey = 'attraction';

export function reducer(state: State | undefined, action: Action) {
  return attractionReducer(state, action);
}
