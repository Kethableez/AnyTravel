import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError, of, tap, filter, withLatestFrom } from 'rxjs';
import { RootState } from 'src/app/core/store/app.states';
import { AuthService } from '../../services/auth/auth.service';
import { clearData, getData } from '../user/user.actions';
import { login, loginSuccess, authError, logout, refresh, refreshSuccess, refreshError } from './auth.actions';
import { selectIsLoggedIn } from './auth.selectors';

@Injectable()
export class AuthEffects {
  constructor(
    private store$: Store<RootState>,
    private actions$: Actions,
    private router: Router,
    private authService: AuthService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((action) => {
        return this.authService.doLogin(action.loginPayload).pipe(
          map((response) =>
            loginSuccess({
              loggedIn: true,
              userId: response.userId,
              authToken: response.authToken
            })
          ),
          catchError((error) => of(authError({ message: error.error.message })))
        );
      })
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      withLatestFrom(this.store$.select(selectIsLoggedIn)),
      filter(([, isLoggedIn]) => isLoggedIn),
      map(() => getData()),
      tap(() => this.router.navigateByUrl('/home'))
    )
  );

  refresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(refresh),
      switchMap(() =>
        this.authService.doRefresh().pipe(
          map((response) => refreshSuccess({ authToken: response.authToken })),
          catchError((error) => of(refreshError(error.error.message)))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      map(() => clearData()),
      switchMap(() => {
        return this.authService.doLogout().pipe(
          map(() => clearData()),
          tap(() => this.router.navigateByUrl('/start'))
        );
      })
    )
  );
}
