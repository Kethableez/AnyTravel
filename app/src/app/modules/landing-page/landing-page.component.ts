import { Component } from '@angular/core';

@Component({
  selector: 'majk-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  isLoginFormActive = false;
  isRegisterFormActive = true;

  toggleLogin() {
    this.isLoginFormActive = !this.isLoginFormActive;
    this.isRegisterFormActive = false;
  }

  toggleRegister() {
    this.isRegisterFormActive = !this.isRegisterFormActive;
    this.isLoginFormActive = false;
  }
}
