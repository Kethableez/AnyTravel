import { createAction, props } from '@ngrx/store';
import { AttractionFilter } from '@models/attraction/attraction-filters/attraction-filter.model';
import { FilterInput } from '@models/attraction/attraction-filters/filter-input.model';
import { SortOptions } from '@models/attraction/attraction-filters/sort-options.model';
import { AttractionPayload } from '@models/attraction/attraction-payload.model';
import { Attraction } from '@models/attraction/attration.model';

export const createAttraction = createAction(
  '[Attraction] Create attraction',
  props<{ file: FormData; payload: AttractionPayload }>()
);

export const initializeFilters = createAction(
  '[Attraction] Initialize filters',
  props<{ filters: AttractionFilter }>()
);

export const filterChange = createAction('[Attraction] Filter change', props<{ filterInput: FilterInput }>());

export const sortChange = createAction('[Attraction] Sort change', props<{ option: SortOptions }>());

export const searchQueryChange = createAction('[Attraction] Search query change', props<{ query: string | null }>());

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

export const deleteAttraction = createAction('[Attraction] Delete attraction', props<{ attractionId: string }>());

export const addReview = createAction('[Attraction] Add review', props<{ attractionId: string; payload: any }>());

export const attractionError = createAction(
  '[Attraction] Error',
  props<{ message: string; dispatchNotification: boolean }>()
);
