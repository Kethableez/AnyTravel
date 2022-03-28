import { createAction, props } from '@ngrx/store';
import { AttractionFilter, FilterInput } from '../../models/attraction/attraction-filter.model';
import { AttractionPayload } from '../../models/attraction/attraction-payload.model';
import { Attraction } from '../../models/attraction/attration.model';

export const createAttraction = createAction(
  '[Attraction] Create attraction',
  props<{ file: FormData; payload: AttractionPayload }>()
);

export const initializeFilters = createAction(
  '[Attraction] Initialize filters',
  props<{ filters: AttractionFilter }>()
);

export const filterChange = createAction('[Attraction] Filter change', props<{ filterInput: FilterInput }>());

// export const createAttractionSuccess = createAction(
//   '[Attraction] Create attraction success',
//   props<{ attraction: Attraction }>()
// );

export const getAttractions = createAction('[Attraction] Get attraction list');

export const getNewAttractions = createAction('[Attraction] Get new attraction');

export const getAttractionsSuccess = createAction(
  '[Attraction] Get attraction success',
  props<{ attractions: Attraction[] }>()
);

export const getNewAttractionsSuccess = createAction(
  '[Attraction] Get new attraction success',
  props<{ attractions: Attraction[] }>()
);

export const approveAttraction = createAction('[Attraction] Approve attraction', props<{ attractionId: string }>());

// export const approveAttractionSuccess = createAction(
//   '[Attraction] Approve attraction success',
//   props<{ attraction: Attraction }>()
// );

export const deleteAttraction = createAction('[Attraction] Delete attraction', props<{ attractionId: string }>());

// export const deleteAttractionSuccess = createAction(
//   '[Attraction] Delete attraction success',
//   props<{ attractionId: string }>()
// );

export const addReview = createAction('[Attraction] Add review', props<{ attractionId: string; payload: any }>());

// export const addReviewSuccess = createAction(
//   '[Attraction] Add review success',
//   props<{ attractionId: string; payload: any }>()
// );

export const attractionError = createAction('[Auth] Error', props<{ message: string }>());
