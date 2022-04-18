import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { InfoComponent } from './components/info/info.component';

@NgModule({
  declarations: [LandingPageComponent, LoginComponent, RegisterComponent, ConfirmComponent, InfoComponent],
  imports: [CommonModule, LandingPageRoutingModule, ReactiveFormsModule, SharedModule]
})
export class LandingPageModule {}
