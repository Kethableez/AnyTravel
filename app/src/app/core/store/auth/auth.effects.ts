import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError, of, tap, filter, withLatestFrom } from 'rxjs';
import { RootState } from 'src/app/core/store/app.states';
import { AuthService } from '../../services/auth/auth.service';
import { TokenService } from '../../services/token.service';
import { clearData, getData } from '../user/user.actions';
import { login, loginSuccess, authError, logout } from './auth.actions';
import { selectIsLoggedIn } from './auth.selectors';

@Injectable()
export class AuthEffects {
  constructor(
    private store$: Store<RootState>,
    private actions$: Actions,
    private router: Router,
    private tokenService: TokenService,
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
              token: response.authToken
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
      tap((action) => {
        this.tokenService.saveToken(action.token);
        this.router.navigateByUrl('/home');
      }),
      withLatestFrom(this.store$.select(selectIsLoggedIn)),
      filter(([, isLoggedIn]) => isLoggedIn),
      map(() => getData())
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      tap(() => {
        this.tokenService.removeToken();
        this.router.navigateByUrl('');
      }),
      switchMap(() =>
        this.authService.doLogout().pipe(
          map(() => clearData()),
          catchError((error) => of(authError({ message: error.error.message })))
        )
      )
    )
  );
}
