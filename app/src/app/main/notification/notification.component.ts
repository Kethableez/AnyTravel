import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/core/store/app.states';
import { NotificationActions, selectIsVisible, selectNotification } from 'src/app/core/store/notification';
import { NotificationType } from 'src/app/core/store/notification/notification.actions';

@Component({
  selector: 'majk-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notification$ = this.store$.select(selectNotification);
  isVisible$ = this.store$.select(selectIsVisible);

  constructor(private store$: Store<RootState>) {}

  ngOnInit(): void {}

  hide() {
    this.store$.dispatch(NotificationActions.hideNotification({ timeout: 0 }));
  }

  getNotificationType(notificationType: NotificationType) {
    switch (notificationType) {
      case NotificationType.SUCCESS:
        return 'is-primary';

      case NotificationType.WARNING:
        return 'is-warning';

      case NotificationType.ERROR:
        return 'is-danger';

      case NotificationType.INFO:
        return 'is-info';
    }
  }
}
