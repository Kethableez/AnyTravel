import { createAction, props } from '@ngrx/store';

export const createJourney = createAction('[Journey Wizard] Create Journey', props<{ payload: any }>());
