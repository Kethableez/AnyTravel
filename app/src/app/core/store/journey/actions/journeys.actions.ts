import { SortOptions } from '@models/journey/sort-options.model';
import { createAction, props } from '@ngrx/store';

export const getUserJourneys = createAction('[Journeys] Get journeys');

export const getUserJourneySuccess = createAction('[Journeys] Get journeys success', props<{ journeys: any[] }>());

export const journeyError = createAction(
  '[Journeys] Journey Error',
  props<{ message: string; dispatchNotification: boolean }>()
);

export const searchQueryChange = createAction('[Journeys] Search query change', props<{ query: string | null }>());

export const sortChange = createAction('[Attraction] Sort change', props<{ option: SortOptions }>());
