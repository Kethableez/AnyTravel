import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WizardSteps } from 'src/app/modules/main-page/pages/journey/components/journey-form/journey-form.component';
import * as Journey from '../reducers/journeys.reducers';
import * as Wizard from '../reducers/wizard.reduers';

interface JourneyState {
  journeys: Journey.State;
  wizard: Wizard.State;
}

enum WizardData {
  INFORMATION = 'information',
  DESTINATION = 'destination',
  GROUP = 'group',
  ATTRACTIONS = 'attractions',
  ACCOMODATION = 'accomodation'
}

export const getJourneyState = createFeatureSelector<JourneyState>('journey');

export const selectIsAttractionSelected = (attractionId: string | undefined) =>
  createSelector(getJourneyState, (state) =>
    attractionId ? state.wizard.selectedAttractions.includes(attractionId) : false
  );

export const selectAttractions = createSelector(getJourneyState, (state) => state.wizard.selectedAttractions);

export const selectUserJourneys = createSelector(getJourneyState, (state) => state.journeys.journeys);

export const selectUpcomingUserJourneys = createSelector(selectUserJourneys, (journeys) => journeys.filter(
  journey => new Date(journey.startDate) > new Date()).sort(
  (journey1, journey2) => new Date(journey1.startDate).getTime() - new Date(journey2.startDate).getTime()
));

export const selectPastUserJourneys = createSelector(selectUserJourneys, (journeys) => journeys.filter(
  journey => new Date(journey.endDate) < new Date()
))

export const selectJourney = (journeyId: string) =>
  createSelector(getJourneyState, (state) => state.journeys.journeys.find((journey) => journey._id === journeyId));

export const selectWizardState = (key: string) =>
  createSelector(getJourneyState, (state) => state.wizard[key as keyof Wizard.State]);

export const selectWizardData = createSelector(
  selectWizardState(WizardData.INFORMATION),
  selectWizardState(WizardData.DESTINATION),
  selectWizardState(WizardData.GROUP),
  selectWizardState(WizardData.ATTRACTIONS),
  selectWizardState(WizardData.ACCOMODATION),
  (information, destination, group, attractions, accomodation) => ({
    information,
    destination,
    group,
    attractions,
    accomodation
  })
);

export const selectCurrentStep = createSelector(selectWizardData, (data) => {
  if (!data.information) {
    return WizardSteps.INFORMATION;
  } else if (!data.destination) {
    return WizardSteps.DESTINATION;
  } else if (!data.group) {
    return WizardSteps.GROUP;
  } else if (data.attractions.length === 0) {
    return WizardSteps.ATTRACTIONS;
  } else if (!data.accomodation) {
    return WizardSteps.ACCOMODATION;
  } else {
    return WizardSteps.SUMMARY;
  }
});
