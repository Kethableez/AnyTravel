import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { RootState } from '../app.states';

@Injectable()
export class NotificationEffects {
  constructor(private store$: Store<RootState>, private actions$: Actions) {}
}
