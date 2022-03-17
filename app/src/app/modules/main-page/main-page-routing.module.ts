import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttractionComponent } from './components/attraction/attraction.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MainPageComponent } from './main-page.component';

const routes: Routes = [
  {
    path: '',
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
