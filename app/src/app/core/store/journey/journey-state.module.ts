import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { JourneyEffects } from './effects/journey.effects';
import { journeysReducer } from './reducers/journeys.reducers';
import { wizardReducer } from './reducers/wizard.reduers';

@NgModule({
  imports: [
    StoreModule.forFeature('journey', {
      journeys: journeysReducer,
      wizard: wizardReducer
    }),
    EffectsModule.forFeature([JourneyEffects])
  ]
})
export class JourneyStateModule {}
