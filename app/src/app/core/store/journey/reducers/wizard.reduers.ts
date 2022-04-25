import { createReducer, on } from '@ngrx/store';
import {
  addAttraction,
  addGroup,
  clearWizard,
  createJourneySuccess,
  removeAttraction,
  removeAttractions,
  removeGroup,
  setStep,
  updateWizard,
  wizardError
} from '../actions/wizard.actions';

export interface State {
  information: any | null;
  destination: any | null;
  group: any | null;
  attractions: any[];
  accomodation: any | null;
  selectedAttractions: string[];
}

export const initialState: State = {
  information: null,
  destination: null,
  group: null,
  attractions: [],
  accomodation: null,
  selectedAttractions: []
};

export const wizardReducer = createReducer(
  initialState,
  on(setStep, (state, action) => ({
    ...state,
    step: action.step
  })),
  on(updateWizard, (state, action) => ({
    ...state,
    [action.key]: action.object
  })),
  on(createJourneySuccess, (state) => ({
    ...state,
    information: null,
    destination: null,
    group: null,
    attractions: [],
    selectedAttractions: [],
    accomodation: null
  })),
  on(addAttraction, (state, action) => ({
    ...state,
    selectedAttractions: [...state.selectedAttractions, action.attractionId]
  })),
  on(removeAttraction, (state, action) => ({
    ...state,
    selectedAttractions: state.selectedAttractions.filter((a) => a !== action.attractionId)
  })),
  on(removeAttractions, (state) => ({
    ...state,
    selectedAttractions: []
  })),
  on(addGroup, (state, action) => ({
    ...state,
    selectedGroup: action.groupId
  })),
  on(removeGroup, (state) => ({
    ...state,
    selectedGroup: ''
  })),
  on(clearWizard, (state) => ({
    ...state,
    information: null,
    destination: null,
    group: null,
    attractions: [],
    accomodation: null
  })),
  on(wizardError, (state, action) => ({
    ...state,
    errorMessage: action.message
  }))
);
export const wizardFeatureKey = 'wizard';

export function reducer(state: State | undefined, action: any) {
  return wizardReducer(state, action);
}
