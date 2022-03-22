import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AttractionEffects } from './attraction.effects';
import { attractionReducer } from './attraction.reducers';
import * as fromAttraction from './attraction.reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAttraction.attractionFeatureKey, attractionReducer),
    EffectsModule.forFeature([AttractionEffects])
  ],
  declarations: []
})
export class AttractionStateModule {}
