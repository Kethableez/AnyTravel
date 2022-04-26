import { createAction, props } from '@ngrx/store';

export const getUserJourneys = createAction('[Journeys] Get journeys');

export const getUserJourneySuccess = createAction('[Journeys] Get journeys success', props<{ journeys: any[] }>());

export const journeyError = createAction(
  '[Journeys] Journey Error',
  props<{ message: string; dispatchNotification: boolean }>()
);
