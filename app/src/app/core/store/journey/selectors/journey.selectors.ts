import { WizardStep } from '@models/journey/wizard-step.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as Journey from '../reducers/journeys.reducers';
import * as Wizard from '../reducers/wizard.reduers';

interface JourneyState {
  journeys: Journey.State;
  wizard: Wizard.State;
}

export const getJourneyState = createFeatureSelector<JourneyState>('journey');

export const selectJourneys = createSelector(getJourneyState, (state) => state.journeys.journeys);

export const selectSortingType = createSelector(getJourneyState, (state) => state.journeys.sortType);

export const selectSearchQuery = createSelector(getJourneyState, (state) => state.journeys.searchQuery);

export const selectWizardInformation = createSelector(getJourneyState, (state) => state.wizard.information);

export const selectWizardMeeting = createSelector(getJourneyState, (state) => state.wizard.meeting);

export const selectWizardDestination = createSelector(getJourneyState, (state) => state.wizard.destination);

export const selectWizardGroup = createSelector(getJourneyState, (state) => state.wizard.group);

export const selectWizardAttractions = createSelector(getJourneyState, (state) => state.wizard.attractions);

export const selectWizardAccomodation = createSelector(getJourneyState, (state) => state.wizard.accomodation);

export const selectUserJourneys = createSelector(selectJourneys, (journeys) => journeys);

export const selectJourneyById = (id: string) =>
  createSelector(selectJourneys, (journeys) => journeys.find((j) => j._id === id));

export const isAttractionSelected = (attractionId: string | undefined) =>
  createSelector(
    selectWizardAttractions,
    (attractions) => attractions.filter((a) => a.id === attractionId).length !== 0
  );

export const selectWizardData = createSelector(
  selectWizardInformation,
  selectWizardMeeting,
  selectWizardDestination,
  selectWizardGroup,
  selectWizardAttractions,
  selectWizardAccomodation,
  (information, meeting, destination, group, attractions, accomodation) => ({
    information,
    meeting,
    destination,
    group,
    attractions,
    accomodation
  })
);

export const selectCurrentStep = createSelector(selectWizardData, (data) => {
  if (!data.information) {
    return WizardStep.INFORMATION;
  } else if (!data.meeting) {
    return WizardStep.MEETING;
  } else if (!data.destination) {
    return WizardStep.DESTINATION;
  } else if (!data.group) {
    return WizardStep.GROUP;
  } else if (data.attractions.length === 0) {
    return WizardStep.ATTRACTIONS;
  } else if (!data.accomodation) {
    return WizardStep.ACCOMODATION;
  } else {
    return WizardStep.SUMMARY;
  }
});
