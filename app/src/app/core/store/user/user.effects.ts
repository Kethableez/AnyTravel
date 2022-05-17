import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { withLatestFrom, filter, switchMap, map, catchError, of, concatMap, tap } from 'rxjs';
import { UserService } from '@services/user/user.service';
import { RootState } from '../app.states';
import { selectIsLoggedIn } from '../auth';
import { showNotification, NotificationType } from '../notification/notification.actions';
import {
  changeAvatar,
  changeData,
  changeDataSuccess,
  clearData,
  deleteAccount,
  getData,
  getDataSuccess,
  register,
  registerSuccess,
  userError
} from './user.actions';
import { FileService } from '@services/file/file.service';
import { Router } from '@angular/router';
import { logout } from '@store/auth/auth.actions';

@Injectable()
export class UserEffects {
  constructor(
    private store$: Store<RootState>,
    private router: Router,
    private actions$: Actions,
    private userService: UserService,
    private fileService: FileService
  ) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      switchMap((action) =>
        this.userService.doRegister(action.registerPayload).pipe(
          concatMap((response) => [
            showNotification({ message: response.message, notificationType: NotificationType.SUCCESS }),
            registerSuccess()
          ]),
          catchError((error) => of(userError({ message: error.error.message, dispatchNotification: true })))
        )
      )
    )
  );

  getData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getData),
      withLatestFrom(this.store$.select(selectIsLoggedIn)),
      filter(([, isLoggedIn]) => isLoggedIn),
      switchMap(() =>
        this.userService.doGetLoggedUserData().pipe(
          map((response) => getDataSuccess({ user: response })),
          catchError((error) => of(userError({ message: error.error.message, dispatchNotification: true })))
        )
      )
    )
  );

  changeData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changeData),
      switchMap((action) =>
        this.userService.doEditData(action.changePayload).pipe(
          concatMap((response) => [
            showNotification({ message: response.message, notificationType: NotificationType.SUCCESS }),
            changeDataSuccess({ user: response.obj })
          ]),
          catchError((error) => of(userError({ message: error.error.message, dispatchNotification: true })))
        )
      )
    )
  );

  changeAvatar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changeAvatar),
      switchMap((action) =>
        this.fileService.doUploadFile('avatar', action.file).pipe(
          map((response) => {
            const payload = {
              avatar: response.filename
            };
            return payload;
          }),
          switchMap((payload) =>
            this.userService
              .doEditData(payload)
              .pipe(
                concatMap((response) => [
                  showNotification({ message: response.message, notificationType: NotificationType.SUCCESS }),
                  changeDataSuccess({ user: response.obj })
                ])
              )
          ),
          catchError((error) => of(userError({ message: error.error.message, dispatchNotification: true })))
        )
      )
    )
  );

  deleteAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteAccount),
      switchMap((action) =>
        this.userService.doDelete(action.payload).pipe(
          concatMap((response) => [
            logout(),
            showNotification({ message: response.message, notificationType: NotificationType.SUCCESS }),
            clearData()
          ]),
          catchError((error) => of(userError({ message: error.error.message, dispatchNotification: true })))
        )
      )
    )
  );

  error$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userError),
      map((action) => action),
      filter((action) => action.dispatchNotification),
      map((action) => showNotification({ message: action.message, notificationType: NotificationType.ERROR }))
    )
  );
}
