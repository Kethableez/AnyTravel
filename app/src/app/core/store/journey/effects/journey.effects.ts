import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { JourneyService } from '@services/journey/journey.service';
import { RootState } from '@store/app.states';
import { NotificationType, showNotification } from '@store/notification/notification.actions';
import { catchError, concatMap, filter, map, of, switchMap } from 'rxjs';
import { getUserJourneys, getUserJourneySuccess, journeyError } from '../actions/journeys.actions';
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
            showNotification({ message: response.message, notificationType: NotificationType.SUCCESS }),
            createJourneySuccess()
          ]),
          catchError((error) => of(wizardError({ message: error.error.message, dispatchNotification: true })))
        )
      )
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
