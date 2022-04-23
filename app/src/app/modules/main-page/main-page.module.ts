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
import { GroupListComponent } from './pages/group/components/group-list/group-list.component';
import { GroupCardComponent } from './pages/group/components/group-card/group-card.component';
import { GroupFormComponent } from './pages/group/components/group-form/group-form.component';
import { JourneyComponent } from './pages/journey/journey.component';
import { WizardComponent } from './pages/journey/components/wizard/wizard.component';
import { StepperComponent } from './pages/journey/components/wizard/stepper/stepper.component';
import { BarComponent } from './pages/journey/components/wizard/bar/bar.component';
import { StepsComponent } from './pages/journey/components/wizard/steps/steps.component';
import { SelectGroupComponent } from './pages/journey/components/wizard/steps/select-group/select-group.component';
import { SelectAttractionsComponent } from './pages/journey/components/wizard/steps/select-attractions/select-attractions.component';
import { AddDetailsComponent } from './pages/journey/components/wizard/steps/add-details/add-details.component';
import { JourneyFormComponent } from './pages/journey/components/journey-form/journey-form.component';

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
    GroupComponent,
    GroupListComponent,
    GroupCardComponent,
    GroupFormComponent,
    JourneyComponent,
    WizardComponent,
    StepperComponent,
    BarComponent,
    StepsComponent,
    SelectGroupComponent,
    SelectAttractionsComponent,
    AddDetailsComponent,
    JourneyFormComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, MainPageRoutingModule]
})
export class MainPageModule {}
