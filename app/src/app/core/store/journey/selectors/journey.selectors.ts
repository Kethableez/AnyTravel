import { WizardStep } from '@models/journey/wizard-step.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as Journey from '../reducers/journeys.reducers';
import * as Wizard from '../reducers/wizard.reduers';

interface JourneyState {
  journeys: Journey.State;
  wizard: Wizard.State;
}

export const getJourneyState = createFeatureSelector<JourneyState>('journey');

export const selectIsWizardEnabled = createSelector(
  getJourneyState,
  (state) => state.wizard.step !== WizardStep.STEP_NONE
);

export const selectIsAttractionSelected = (attractionId: string | undefined) =>
  createSelector(getJourneyState, (state) =>
    attractionId ? state.wizard.selectedAttractions.includes(attractionId) : false
  );

export const selectAttractions = createSelector(getJourneyState, (state) => state.wizard.selectedAttractions);

export const selectGroup = createSelector(getJourneyState, (state) => state.wizard.selectedGroup);
