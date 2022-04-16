import { Action, createReducer, on } from '@ngrx/store';
import { hideNotification, NotificationType, showNotification } from './notification.actions';

export interface State {
  isVisible: boolean;
  message: string | null;
  notificationType: NotificationType;
}

export const initialState: State = {
  isVisible: false,
  message: null,
  notificationType: NotificationType.SUCCESS
};

export const notificationReducer = createReducer(
  initialState,
  on(showNotification, (state, action) => ({
    ...state,
    isVisible: true,
    message: action.message,
    notificationType: action.notificationType
  })),
  on(hideNotification, (state) => ({
    ...state,
    isVisible: false,
    message: null
  }))
);

export const notificationFeatureKey = 'notification';

export function reducer(state: State | undefined, action: Action) {
  return notificationReducer(state, action);
}
