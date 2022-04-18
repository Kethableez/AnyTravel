import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as Notification from './notification.reducers';

export const selectNotificationState = createFeatureSelector<Notification.State>(Notification.notificationFeatureKey);

export const selectIsVisible = createSelector(selectNotificationState, (state) => state.isVisible);

export const selectMessage = createSelector(selectNotificationState, (state) => state.message);

export const selectNotificationType = createSelector(selectNotificationState, (state) => state.notificationType);

export const selectNotification = createSelector(selectNotificationState, (state) => {
  return {
    isVisible: state.isVisible,
    message: state.message,
    notificationType: state.notificationType
  };
});
