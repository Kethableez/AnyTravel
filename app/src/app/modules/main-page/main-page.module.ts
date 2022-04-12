import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { AttractionComponent } from './pages/attraction/attraction.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AttractionFormComponent } from './pages/attraction/components/attraction-form/attraction-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AttractionListComponent } from './pages/attraction/components/attraction-list/attraction-list.component';
import { AttractionCardComponent } from './pages/attraction/components/attraction-card/attraction-card.component';
import { FiltersComponent } from './pages/attraction/components/filters/filters.component';
import { FilterInputComponent } from './pages/attraction/components/filter-input/filter-input.component';
import { SearchComponent } from './pages/attraction/components/search/search.component';
import { SortComponent } from './pages/attraction/components/sort/sort.component';
import { GroupComponent } from './pages/group/group.component';

@NgModule({
  declarations: [
    MainPageComponent,
    NavigationComponent,
    ProfileComponent,
    AttractionComponent,
    AttractionFormComponent,
    AttractionListComponent,
    AttractionCardComponent,
    FiltersComponent,
    FilterInputComponent,
    SearchComponent,
    SortComponent,
    GroupComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, MainPageRoutingModule]
})
export class MainPageModule { }
