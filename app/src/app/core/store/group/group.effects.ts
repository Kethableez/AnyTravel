import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { withLatestFrom, filter, switchMap, map, catchError, of } from 'rxjs';
import { CreateGroupPayload } from '../../models/group/crate-group-payload';
import { FileService } from '../../services/file/file.service';
import { GroupService } from '../../services/group/group.service';
import { RootState } from '../app.states';
import { selectIsLoggedIn } from '../auth';
import {
  groupError,
  createGroup,
  getNewGroupSuccess,
  getNewGroup,
  deleteGroup,
  editGroup,
  getUserGroups,
  getUserGroupsSuccess,
  addUserToGroup
} from './group.actions';

@Injectable()
export class GroupEffects {
  constructor(
    private store$: Store<RootState>,
    private actions$: Actions,
    private groupService: GroupService,
    private fileService: FileService
  ) { }

  getGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserGroups),
      withLatestFrom(this.store$.select(selectIsLoggedIn)),
      filter(([, isLoggedIn]) => isLoggedIn),
      switchMap(() =>
        this.groupService.doGetAllUserGroups().pipe(
          map((response) => getUserGroupsSuccess({ groups: response })),
          catchError((error) => of(groupError({ message: error.error.message })))
        )
      )
    )
  );

  getNewGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserGroups),
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
      switchMap((action) => {
        return this.fileService.doUploadFile('group', action.file).pipe(
          map((response) => {
            const group: CreateGroupPayload = {
              ...action.payload,
              cover: response.filename
            };
            return group;
          }),
          switchMap((payload: CreateGroupPayload) => {
            return this.groupService.doCreateGroup(payload).pipe(
              map(
                () => getUserGroups(),
                catchError((error) => of(groupError({ message: error.error.message })))
              )
            );
          }),
          catchError((error) => of(groupError({ message: error.error.message })))
        );
      })
    )
  );

  deleteGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteGroup),
      switchMap((action) => {
        return this.groupService.doDeleteGroup(action.groupId).pipe(
          switchMap(() => [getUserGroups(), getNewGroup()]),
          catchError((error) => of(groupError({ message: error.error.message })))
        );
      })
    )
  );

  editGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editGroup),
      switchMap((action) => {
        return this.groupService.doEdit(action.groupId, action.payload).pipe(
          map(
            () => getUserGroups(),
            catchError((error) => of(groupError({ message: error.error.message })))
          )
        );
      })
    )
  );


  addUserToGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUserToGroup),
      switchMap((action) => {
        return this.groupService.doAdd(action.groupId, action.payload).pipe(
          map(
            () => getUserGroups(),
            catchError((error) => of(groupError({ message: error.error.message })))
          )
        );
      })
    )
  );

}


