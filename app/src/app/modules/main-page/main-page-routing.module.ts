import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import { MainPageComponent } from './main-page.component';
import { AttractionComponent } from './pages/attraction/attraction.component';
import { ProfileComponent } from './pages/profile/profile.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule {}
