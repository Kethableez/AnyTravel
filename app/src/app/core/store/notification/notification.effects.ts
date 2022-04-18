import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { delay, filter, switchMap, tap, withLatestFrom } from 'rxjs';
import { RootState } from '../app.states';
import { hideNotification, showNotification } from './notification.actions';
import { selectIsVisible } from './notification.selectors';

@Injectable()
export class NotificationEffects {
  constructor(private store$: Store<RootState>, private actions$: Actions) {}

  showNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(showNotification),
        delay(5000),
        withLatestFrom(this.store$.select(selectIsVisible)),
        filter(([, isVisible]) => isVisible),
        tap(() => this.store$.dispatch(hideNotification({ timeout: 5000 })))
      ),
    { dispatch: false }
  );
}
