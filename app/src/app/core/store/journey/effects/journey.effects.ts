import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { JourneyService } from '@services/journey/journey.service';
import { RootState } from '@store/app.states';
import { NotificationType, showNotification } from '@store/notification/notification.actions';
import { catchError, concatMap, filter, map, of, switchMap } from 'rxjs';
import {
  getNotifications,
  getNotificationsSuccess,
  getUserJourneys,
  getUserJourneySuccess,
  journeyError,
  markAsRead,
  updateParticipation,
  updateParticipationSuccess
} from '../actions/journeys.actions';
import { createJourney, createJourneySuccess, wizardError } from '../actions/wizard.actions';

@Injectable({
  providedIn: 'root'
})
export class JourneyEffects {
  constructor(private actions$: Actions, private journeyService: JourneyService, private store$: Store<RootState>) {}

  createJourney$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createJourney),
      switchMap((action) =>
        this.journeyService.doCreate(action.journeyPayload).pipe(
          concatMap((response) => [
            getUserJourneys(),
            showNotification({ message: response.message, notificationType: NotificationType.SUCCESS }),
            createJourneySuccess()
          ]),
          catchError((error) => of(wizardError({ message: error.error.message, dispatchNotification: true })))
        )
      )
    )
  );

  getNotifications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getNotifications),
      switchMap(() =>
        this.journeyService.doGetNotifications().pipe(
          map((response) => getNotificationsSuccess({ notifications: response })),
          catchError((error) => of(journeyError({ message: error.error.message, dispatchNotification: false })))
        )
      )
    )
  );

  markAsRead$ = createEffect(() =>
    this.actions$.pipe(
      ofType(markAsRead),
      switchMap((action) =>
        this.journeyService.doMarkAsRead(action.notificationId).pipe(
          map(() => getNotifications()),
          catchError((error) => of(journeyError({ message: error.error.message, dispatchNotification: false })))
        )
      )
    )
  );

  updateParticipation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateParticipation),
      switchMap((action) =>
        this.journeyService
          .doUpdateParticipation(action.payload)
          .pipe(
            concatMap((response) => [
              showNotification({ message: response.message, notificationType: NotificationType.SUCCESS }),
              getUserJourneys()
            ])
          )
      ),
      catchError((error) => of(wizardError({ message: error.error.message, dispatchNotification: true })))
    )
  );

  getUserJourneys$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserJourneys),
      switchMap(() => {
        return this.journeyService.doGetByUser().pipe(
          map((response) => getUserJourneySuccess({ journeys: response })),
          catchError((error) => of(journeyError(error.error.message)))
        );
      })
    )
  );

  error$ = createEffect(() =>
    this.actions$.pipe(
      ofType(journeyError),
      map((action) => action),
      filter((action) => action.dispatchNotification),
      map((action) => showNotification({ message: action.message, notificationType: NotificationType.ERROR }))
    )
  );
}
