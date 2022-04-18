import { createAction, props } from '@ngrx/store';

export enum NotificationType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  INFO = 'INFO',
  WARNING = 'WARNING'
}

export const showNotification = createAction(
  '[Notification] Show',
  props<{ message: string; notificationType: NotificationType }>()
);

export const showNotificationSuccess = createAction('[Notification] Show Success');

export const hideNotification = createAction('[Notification] Hide', props<{ timeout: number }>());
