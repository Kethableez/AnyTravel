import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorPipe } from './pipes/form-error.pipe';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { CleanableDirective } from './directives/cleanable.directive';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [FormErrorPipe, CleanableDirective],
  imports: [CommonModule, MatTabsModule, MatMenuModule, MatBadgeModule],
  exports: [FormErrorPipe, MatTabsModule, MatMenuModule, CleanableDirective, MatBadgeModule]
})
export class SharedModule {}
