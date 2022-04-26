import { WizardStep } from '@models/journey/wizard-step.model';
import { createAction, props } from '@ngrx/store';

export const updateWizard = createAction('[Journey Wizard] Update Wizard', props<{ key: string; object: any }>());

export const setStep = createAction('[Journey Wizard] Set Step', props<{ step: WizardStep }>());

export const createJourney = createAction('[Journey Wizard] Create Journey', props<{ journeyPayload: any }>());

export const createJourneySuccess = createAction('[Journey Wizard] Create Journey Success');

export const addAttraction = createAction('[Journey Wizard] Add Attraction', props<{ attractionId: string }>());

export const removeAttraction = createAction('[Journey Wizard] Remove Attraction', props<{ attractionId: string }>());

export const removeAttractions = createAction('[Journey Wizard] Remove attractions');

export const clearWizard = createAction('[Journey Wizard] Clear wizard');

export const addGroup = createAction('[Journey Wizard] Add group', props<{ groupId: string }>());

export const removeGroup = createAction('[Journey Wizard] Remove group');

export const wizardError = createAction(
  '[Journey Wizard] Error',
  props<{ message: string; dispatchNotification: boolean }>()
);
