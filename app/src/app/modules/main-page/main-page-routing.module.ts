import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupComponent } from './pages/group/group.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { MainPageComponent } from './main-page.component';
import { AttractionComponent } from './pages/attraction/attraction.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { JourneyComponent } from './pages/journey/journey.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: MainPageComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'attraction',
        component: AttractionComponent
      },
      {
        path: 'groups',
        component: GroupComponent
      },
      {
        path: 'journey',
        component: JourneyComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule {}
