import { createAction, props } from '@ngrx/store';

export const createJourney = createAction('[Journey Wizard] Create Journey', props<{ payload: any }>());

export const getJourneys = createAction('[Journeys] Get journeys');

export const getJourneySuccess = createAction('[Journeys] Get journeys');
