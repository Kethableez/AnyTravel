import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { withLatestFrom, filter, switchMap, map, catchError, of, concatMap } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { RootState } from '../app.states';
import { selectIsLoggedIn } from '../auth';
import { showNotification, NotificationType } from '../notification/notification.actions';
import { getData, getDataSuccess, register, registerSuccess, userError } from './user.actions';

@Injectable()
export class UserEffects {
  constructor(private store$: Store<RootState>, private actions$: Actions, private userService: UserService) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      switchMap((action) =>
        this.userService.doRegister(action.registerPayload).pipe(
          concatMap((response) => [
            showNotification({ message: response.message, notificationType: NotificationType.SUCCESS }),
            registerSuccess()
          ]),
          catchError((error) => of(userError({ message: error.error.message, dispatchNotification: true })))
        )
      )
    )
  );

  getData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getData),
      withLatestFrom(this.store$.select(selectIsLoggedIn)),
      filter(([, isLoggedIn]) => isLoggedIn),
      switchMap(() =>
        this.userService.doGetLoggedUserData().pipe(
          map((response) => getDataSuccess({ user: response })),
          catchError((error) => of(userError({ message: error.error.message, dispatchNotification: true })))
        )
      )
    )
  );

  error$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userError),
      map((action) => action),
      filter((action) => action.dispatchNotification),
      map((action) => showNotification({ message: action.message, notificationType: NotificationType.ERROR }))
    )
  );
}
