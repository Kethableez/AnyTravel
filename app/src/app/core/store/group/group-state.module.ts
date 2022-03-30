import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { GroupEffects } from './group.effects';
import { groupsReducer } from './group.reducers';
import * as fromGroup from './group.reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromGroup.groupsFeatureKey, groupsReducer),
    EffectsModule.forFeature([GroupEffects])
  ],
  declarations: []
})
export class GroupStateModule { }
