import { DisplayType } from '@models/journey/display-type.model';
import { createAction, props } from '@ngrx/store';
import { JourneyNotification } from '@services/journey/journey.service';

export const getUserJourneys = createAction('[Journeys] Get journeys');

export const getUserJourneySuccess = createAction('[Journeys] Get journeys success', props<{ journeys: any[] }>());

export const journeyError = createAction(
  '[Journeys] Journey Error',
  props<{ message: string; dispatchNotification: boolean }>()
);

export const searchQueryChange = createAction('[Journeys] Search query change', props<{ query: string | null }>());

export const displayTypeChange = createAction('[Journeys] Display change', props<{ option: DisplayType }>());

export const updateParticipation = createAction('[Journeys] Update participation', props<{ payload: any }>());

export const updateParticipationSuccess = createAction('[Journeys] Update participation', props<{ payload: any }>());

export const getNotifications = createAction('[Journeys] Get notifications');

export const getNotificationsSuccess = createAction(
  '[Journeys] Get notifications success',
  props<{ notifications: JourneyNotification[] }>()
);

export const markAsRead = createAction('[Journeys] Mark as read', props<{ notificationId: string }>());
