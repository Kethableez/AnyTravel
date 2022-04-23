import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorPipe } from './pipes/form-error.pipe';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { CleanableDirective } from './directives/cleanable.directive';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { LabelPipe } from './pipes/label.pipe';

@NgModule({
  declarations: [FormErrorPipe, CleanableDirective, LabelPipe],
  imports: [CommonModule, MatTabsModule, MatMenuModule, MatBadgeModule, MatExpansionModule],
  exports: [
    FormErrorPipe,
    LabelPipe,
    MatTabsModule,
    MatMenuModule,
    CleanableDirective,
    MatBadgeModule,
    MatExpansionModule
  ]
})
export class SharedModule {}
