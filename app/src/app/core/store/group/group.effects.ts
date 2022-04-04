import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { withLatestFrom, filter, switchMap, map, catchError, of } from 'rxjs';
import { CreateGroupPayload } from '../../models/group/crate-group-payload';
import { GroupService } from '../../services/group/group.service';
import { RootState } from '../app.states';
import { selectIsLoggedIn } from '../auth';
import { getData, getDataSuccess, groupError, createGroup, getNewGroupSuccess, getNewGroup, deleteGroup, editGroup } from './group.actions';

@Injectable()
export class GroupEffects {
  constructor(
    private store$: Store<RootState>,
    private actions$: Actions,
    private groupService: GroupService) { }

  getGroup$ = createEffect(() =>
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

  getNewGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getData),
      withLatestFrom(this.store$.select(selectIsLoggedIn)),
      filter(([, isLoggedIn]) => isLoggedIn),
      switchMap(() =>
        this.groupService.doGetAllUserGroups().pipe(
          map((response) => getNewGroupSuccess({ groups: response })),
          catchError((error) => of(groupError({ message: error.error.message })))
        )
      )
    )
  );

  createGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createGroup),
      switchMap((action) =>
        this.groupService.doCreateGroup(action.payload).pipe(
          map(() => getData(),
            catchError((error) => of(groupError({ message: error.error.message }))))
        )
      )
    )
  );

  deleteGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteGroup),
      switchMap((action) => {
        return this.groupService.doDeleteGroup(action.groupId).pipe(
          switchMap(() => [getData(), getNewGroup()]),
          catchError((error) => of(groupError({ message: error.error.message })
          ))
        );
      })
    )
  );

  editGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editGroup),
      switchMap((action) =>
        this.groupService.doEdit(action.groupId, action.payload).pipe(
          map(() => getData(),
            catchError((error) => of(groupError({ message: error.error.message }))))
        )
      )
    )
  );

}
