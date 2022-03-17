import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { withLatestFrom, filter, switchMap, map, catchError, of } from 'rxjs';
import { GroupService } from '../../services/group/group.service';
import { RootState } from '../app.states';
import { selectIsLoggedIn } from '../auth';
import { getData, getDataSuccess, groupError } from './group.actions';

@Injectable()
export class GroupEffects {
  constructor(private store$: Store<RootState>, private actions$: Actions, private groupService: GroupService) { }

  getData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getData),
      withLatestFrom(this.store$.select(selectIsLoggedIn)),
      filter(([, isLoggedIn]) => isLoggedIn),
      switchMap(() =>
        this.groupService.doGetAllUserGroups().pipe(
          map((response) => getDataSuccess({ groups: response })),
          catchError((error) => of(groupError({ message: error.error.message })))
        )
      )
    )
  );
}
