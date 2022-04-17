import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, filter, map, of, switchMap, withLatestFrom } from 'rxjs';
import { initFilters } from '@helpers/attraction-filter.helpers';
import { AttractionPayload } from '@models/attraction/attraction-payload.model';
import { AttractionService } from '@services/attraction/attraction.service';
import { FileService } from '@services/file/file.service';
import { RootState } from '../app.states';
import { selectUserRole } from '../user';
import {
  addReview,
  approveAttraction,
  attractionError,
  createAttraction,
  deleteAttraction,
  getAttractions,
  getAttractionsSuccess,
  getNewAttractions,
  getNewAttractionsSuccess,
  initializeFilters
} from './attraction.actions';

@Injectable()
export class AttractionEffects {
  constructor(
    private store$: Store<RootState>,
    private actions$: Actions,
    private fileService: FileService,
    private attractionService: AttractionService
  ) {}

  createAttraction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createAttraction),
      switchMap((action) => {
        return this.fileService.doUploadFile('attraction', action.file).pipe(
          map((response) => {
            const attraction: AttractionPayload = {
              ...action.payload,
              cover: response.filename
            };
            return attraction;
          }),
          switchMap((payload: AttractionPayload) => {
            return this.attractionService.doCreateAttraction(payload).pipe(
              map(() => getNewAttractions()),
              catchError((error) => of(attractionError({ message: error.error.message })))
            );
          }),
          catchError((error) => of(attractionError({ message: error.error.message })))
        );
      })
    )
  );

  getAttractions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAttractions),
      switchMap(() => {
        return this.attractionService.doGetAll().pipe(
          switchMap((response) => [
            getAttractionsSuccess({ attractions: response }),
            initializeFilters({ filters: initFilters(response) })
          ]),
          catchError((error) => of(attractionError({ message: error.error.message })))
        );
      })
    )
  );

  getNewAttractions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getNewAttractions),
      withLatestFrom(this.store$.select(selectUserRole)),
      filter(([, role]) => role === 'Moderator'),
      switchMap(() => {
        return this.attractionService.doGetToApprove().pipe(
          map((response) => getNewAttractionsSuccess({ attractions: response })),
          catchError((error) => of(attractionError({ message: error.error.message })))
        );
      })
    )
  );

  approveAttraction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(approveAttraction),
      switchMap((action) => {
        return this.attractionService.doApprove(action.attractionId).pipe(
          switchMap(() => [getNewAttractions(), getAttractions()]),
          catchError((error) => of(attractionError({ message: error.error.message })))
        );
      })
    )
  );

  deleteAttraction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteAttraction),
      switchMap((action) => {
        return this.attractionService.doDelete(action.attractionId).pipe(
          switchMap(() => [getNewAttractions(), getAttractions()]),
          catchError((error) => of(attractionError({ message: error.error.message })))
        );
      })
    )
  );

  addReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addReview),
      switchMap((action) => {
        return this.attractionService.doAddReview(action.attractionId, action.payload).pipe(
          map(() => getAttractions()),
          catchError((error) => of(attractionError({ message: error.error.message })))
        );
      })
    )
  );
}
