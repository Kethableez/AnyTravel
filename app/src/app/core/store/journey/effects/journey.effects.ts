import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable({
  providedIn: 'root'
})
export class JourneyEffects {
  constructor(private actions$: Actions) // private journeyService: JourneyService
  {}
}
