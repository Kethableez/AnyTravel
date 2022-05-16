import { DisplayType } from '@models/journey/display-type.model';
import { createAction, props } from '@ngrx/store';

export const getUserJourneys = createAction('[Journeys] Get journeys');

export const getUserJourneySuccess = createAction('[Journeys] Get journeys success', props<{ journeys: any[] }>());

export const journeyError = createAction(
  '[Journeys] Journey Error',
  props<{ message: string; dispatchNotification: boolean }>()
);

export const searchQueryChange = createAction('[Journeys] Search query change', props<{ query: string | null }>());

export const displayTypeChange = createAction('[Attraction] Display change', props<{ option: DisplayType }>());
