import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './modules/main-page/components/profile/profile.component';

const routes: Routes = [
  {
    path: 'start',
    loadChildren: () => import('./modules/landing-page/landing-page.module').then((m) => m.LandingPageModule)
  },
  { path: 'home', loadChildren: () => import('./modules/main-page/main-page.module').then((m) => m.MainPageModule) },
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: 'start' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
