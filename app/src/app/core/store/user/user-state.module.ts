import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserEffects } from './user.effects';
import { userReducer } from './user.reducers';
import * as fromUser from './user.reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromUser.userFeatureKey, userReducer),
    EffectsModule.forFeature([UserEffects])
  ],
  declarations: []
})
export class UserStateModule {}
