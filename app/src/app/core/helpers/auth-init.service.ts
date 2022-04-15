import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { first, tap } from 'rxjs';
import { RootState } from '../store/app.states';
import { AuthActions, selectAuth } from '../store/auth';

@Injectable()
export class AuthInitService {
  constructor(private store$: Store<RootState>) {}

  authInit() {
    return this.store$.pipe(
      select(selectAuth),
      first(),
      tap((auth) => {
        if (auth.loggedIn) this.store$.dispatch(AuthActions.refresh());
      })
    );
  }
}
