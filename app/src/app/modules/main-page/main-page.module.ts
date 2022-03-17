import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AttractionComponent } from './components/attraction/attraction.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MainPageComponent, NavigationComponent, ProfileComponent, AttractionComponent],
  imports: [CommonModule, SharedModule, MainPageRoutingModule]
})
export class MainPageModule {}
