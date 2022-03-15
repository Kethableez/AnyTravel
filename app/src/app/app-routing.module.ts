import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'start',
    loadChildren: () => import('./modules/landing-page/landing-page.module').then((m) => m.LandingPageModule)
  },
  { path: 'home', loadChildren: () => import('./modules/main-page/main-page.module').then((m) => m.MainPageModule) },
  { path: '**', redirectTo: 'start' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
