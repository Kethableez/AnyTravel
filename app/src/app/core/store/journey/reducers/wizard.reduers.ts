import { WizardStep } from '@models/journey/wizard-step.model';
import { createReducer, on } from '@ngrx/store';
import { addAttraction, addGroup, removeAttraction, removeGroup, setStep } from '../actions/wizard.actions';

export interface State {
  step: WizardStep;
  journeyObject: any;
  processId: string | null;
  error: '';
  selectedAttractions: string[];
  selectedGroup: string;
}

export const initialState: State = {
  step: WizardStep.STEP_FINISH,
  journeyObject: {},
  processId: null,
  error: '',
  selectedAttractions: [],
  selectedGroup: ''
};

export const wizardReducer = createReducer(
  initialState,
  on(setStep, (state, action) => ({
    ...state,
    step: action.step
  })),
  on(addAttraction, (state, action) => ({
    ...state,
    selectedAttractions: [...state.selectedAttractions, action.attractionId]
  })),
  on(removeAttraction, (state, action) => ({
    ...state,
    selectedAttractions: state.selectedAttractions.filter((a) => a !== action.attractionId)
  })),
  on(addGroup, (state, action) => ({
    ...state,
    selectedGroup: action.groupId
  })),
  on(removeGroup, (state) => ({
    ...state,
    selectedGroup: ''
  }))
);
export const wizardFeatureKey = 'wizard';

export function reducer(state: State | undefined, action: any) {
  return wizardReducer(state, action);
}
