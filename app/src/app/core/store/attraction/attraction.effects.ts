import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap } from "rxjs";
import { AttractionService } from "../../services/attraction/attraction.service";
import { FileService } from "../../services/file/file.service";
import { RootState } from "../app.states";
import { attractionError, createAttraction } from "./attraction.actions";

@Injectable()
export class AuthEffects {
  constructor(
    private store$: Store<RootState>,
    private actions$: Actions,
    private fileService: FileService,
    private attractionService: AttractionService
  ) {}

  // TODO: Upload file then save attraction
  createAttraction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createAttraction),
      map((action) => {
        return this.fileService.doUploadFile('attraction', action.file).pipe(
          map((response) => response.message),
          catchError((error) => of(attractionError(error.error.message)))
        )
      }),
      switchMap(([action, filename] => {
        const payload = action.payload;
      }))
    )
  )

}
