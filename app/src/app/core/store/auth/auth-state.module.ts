import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './auth.effects';
import { authFeatureKey, authReducer } from './auth.reducers';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(authFeatureKey, authReducer), EffectsModule.forFeature([AuthEffects])],
  declarations: []
})
export class AuthStateModule {}
