import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { LandingPageComponent } from '../../landing-page.component';
import { ConfirmComponent } from '../confirm/confirm.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'majk-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  constructor() {}
  routes: Routes = [
    {
      path: '',
      component: LandingPageComponent,
      children: [
        { path: '', component: InfoComponent },
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'confirm/:confirmId', component: ConfirmComponent },
        { path: '', redirectTo: 'home', pathMatch: 'full' }
      ]
    }
  ];
  ngOnInit(): void {}
}
