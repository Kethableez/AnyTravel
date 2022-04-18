import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NotificationEffects } from './notification.effects';
import { notificationFeatureKey, notificationReducer } from './notification.reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(notificationFeatureKey, notificationReducer),
    EffectsModule.forFeature([NotificationEffects])
  ],
  declarations: []
})
export class NotificationStateModule {}
