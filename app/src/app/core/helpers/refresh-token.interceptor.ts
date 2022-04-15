import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  BehaviorSubject,
  catchError,
  filter,
  first,
  Observable,
  OperatorFunction,
  switchMap,
  tap,
  throwError
} from 'rxjs';
import { RootState } from '../store/app.states';
import { AuthActions, selectAuth } from '../store/auth';
import * as Auth from '../store/auth/auth.reducers';

const exists = <T>(state: T): boolean => !!state;

function filterExists<T>(): OperatorFunction<T, NonNullable<T>> {
  return filter<T>((item) => exists(item)) as OperatorFunction<T, NonNullable<T>>;
}

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  constructor(private store$: Store<RootState>) {}

  private inProgress = false;
  private refreshTokenSubject: BehaviorSubject<unknown> = new BehaviorSubject<unknown>(null);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.handleRefreshTokenInterception(req, next);
  }

  private handleRefreshTokenInterception(req: HttpRequest<unknown>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error) =>
        this.store$.pipe(
          select(selectAuth),
          first(),
          switchMap((authState) => this.handleError(req, next, error, authState))
        )
      )
    );
  }

  private handleError(req: HttpRequest<unknown>, next: HttpHandler, error: HttpErrorResponse, authState: Auth.State) {
    const url = req.url;
    const statusCode = error.status;
    const isRefreshToken = url.split('/').includes('refresh') ? true : false;

    if (statusCode !== 401) {
      if (isRefreshToken) this.store$.dispatch(AuthActions.logout());
      return throwError(() => new Error(error.message));
    }

    return this.refreshToken(req, next, authState);
  }

  private refreshToken(req: HttpRequest<unknown>, next: HttpHandler, authState: Auth.State) {
    if (this.inProgress) {
      return this.refreshTokenSubject.pipe(
        filterExists(),
        first(),
        switchMap(() => next.handle(req))
      );
    } else {
      this.inProgress = true;
      this.refreshTokenSubject.next(null);
      if (!authState.inProgress) this.store$.dispatch(AuthActions.refresh());

      return this.store$.pipe(
        select(selectAuth),
        filter((newAuth) => !newAuth.inProgress),
        first(),
        tap((newAuth) => {
          this.inProgress = false;
          this.refreshTokenSubject.next(newAuth);
        }),
        switchMap(() => next.handle(req))
      );
    }
  }
}
