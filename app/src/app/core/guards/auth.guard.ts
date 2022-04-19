import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { RootState } from '@store/app.states';
import { selectIsLoggedIn } from '@store/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store$: Store<RootState>, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store$.select(selectIsLoggedIn).pipe(
      map((isLoggedIn) => {
        if (!isLoggedIn) this.router.navigateByUrl('start');
        return isLoggedIn;
      })
    );
  }
}
