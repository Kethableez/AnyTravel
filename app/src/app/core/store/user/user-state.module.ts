import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserEffects } from './user.effects';
import { userFeatureKey, userReducer } from './user.reducers';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(userFeatureKey, userReducer), EffectsModule.forFeature([UserEffects])],
  declarations: []
})
export class UserStateModule {}
