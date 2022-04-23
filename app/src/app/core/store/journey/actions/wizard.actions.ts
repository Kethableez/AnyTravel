import { WizardStep } from '@models/journey/wizard-step.model';
import { createAction, props } from '@ngrx/store';

export const createJourneyProcess = createAction('[Journey Wizard] Create Journey Process', props<{ payload: any }>());
export const createJourneyProcessSuccess = createAction(
  '[Journey Wizard] Create Journey Process Success',
  props<{ payload: any }>()
);

export const updateJourneyProcess = createAction('[Journey Wizard] Update Journey Process', props<{ payload: any }>());
export const updateJourneyProcessSuccess = createAction(
  '[Journey Wizard] Update Journey Process Success',
  props<{ payload: any }>()
);

export const setStep = createAction('[Journey Wizard] Set Step', props<{ step: WizardStep }>());

export const addAttraction = createAction('[Journey Wizard] Add Attraction', props<{ attractionId: string }>());

export const removeAttraction = createAction('[Journey Wizard] Remove Attraction', props<{ attractionId: string }>());

export const addGroup = createAction('[Journey Wizard] Add group', props<{ groupId: string }>());

export const removeGroup = createAction('[Journey Wizard] Remove group');
