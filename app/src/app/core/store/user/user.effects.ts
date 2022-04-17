import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { withLatestFrom, filter, switchMap, map, catchError, of } from 'rxjs';
import { UserService } from '@services/user/user.service';
import { RootState } from '../app.states';
import { selectIsLoggedIn } from '../auth';
import { getData, getDataSuccess, register, registerSuccess, userError } from './user.actions';

@Injectable()
export class UserEffects {
  constructor(private store$: Store<RootState>, private actions$: Actions, private userService: UserService) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      switchMap((action) =>
        this.userService.doRegister(action.registerPayload).pipe(
          map(() => registerSuccess()),
          catchError((error) => of(userError({ message: error.error.message })))
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
          catchError((error) => of(userError({ message: error.error.message })))
        )
      )
    )
  );
}
