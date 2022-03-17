import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorPipe } from './pipes/form-error.pipe';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [FormErrorPipe],
  imports: [CommonModule, MatTabsModule],
  exports: [FormErrorPipe, MatTabsModule]
})
export class SharedModule {}
