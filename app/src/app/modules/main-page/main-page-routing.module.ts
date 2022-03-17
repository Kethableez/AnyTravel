import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupComponent } from './components/group/group.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MainPageComponent } from './main-page.component';

const routes: Routes = [{
  path: '', component: MainPageComponent,
  children: [
    {
      path: 'profile', component: ProfileComponent
    },
    {
      path: 'groups', component: GroupComponent
    }
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule { }
