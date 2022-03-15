import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    MainPageComponent,
    NavigationComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule
  ]
})
export class MainPageModule { }
