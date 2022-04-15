import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { first, Observable, switchMap } from 'rxjs';
import { RootState } from '../store/app.states';
import { selectAuth } from '../store/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store$: Store<RootState>) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store$.pipe(
      select(selectAuth),
      first(),
      switchMap((authState) => {
        req = authState.authToken ? this.addToken(req, authState.authToken) : req;

        return next.handle(req);
      })
    );
  }

  private addToken(req: HttpRequest<unknown>, token: string) {
    return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
}
