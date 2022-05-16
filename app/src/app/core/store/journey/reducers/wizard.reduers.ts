import { Accomodation } from '@models/journey/accomodation.model';
import { Attraction } from '@models/journey/attraction.model';
import { Destination } from '@models/journey/destination.model';
import { Group } from '@models/journey/group.model';
import { Information } from '@models/journey/information.model';
import { Meeting } from '@models/journey/meeting.model';
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
  information: Information | null;
  meetingPlace: Meeting | null;
  destination: Destination | null;
  group: Group | null;
  attractions: Attraction[];
  accomodation: Accomodation | null;
}

export const initialState: State = {
  information: null,
  meetingPlace: null,
  destination: null,
  group: null,
  attractions: [],
  accomodation: null
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
    meetingPlace: null,
    destination: null,
    group: null,
    attractions: [],
    accomodation: null
  })),
  on(addAttraction, (state, action) => ({
    ...state,
    attractions: [...state.attractions, attractionMapper(action.attractionId, action.name)]
  })),
  on(removeAttraction, (state, action) => ({
    ...state,
    attractions: state.attractions.filter((a) => a.id !== action.attractionId)
  })),
  on(removeAttractions, (state) => ({
    ...state,
    attractions: []
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

function attractionMapper(attractionId: string, name: string): Attraction {
  return {
    id: attractionId,
    name: name,
    date: '',
    duration: '',
    additionalInfo: ''
  };
}
