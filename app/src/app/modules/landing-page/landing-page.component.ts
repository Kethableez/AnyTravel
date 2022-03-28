import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/core/store/app.states';
import { selectIsLoggedIn } from 'src/app/core/store/auth';

@Component({
  selector: 'majk-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  isLoginFormActive = false;
  isRegisterFormActive = true;

  constructor(private store$: Store<RootState>, private router: Router) {}

  ngOnInit(): void {
    this.store$.select(selectIsLoggedIn).subscribe((isLoggedIn) => {
      if (isLoggedIn) this.router.navigateByUrl('/home');
    });
  }

  toggleLogin() {
    this.isLoginFormActive = !this.isLoginFormActive;
    this.isRegisterFormActive = false;
  }

  toggleRegister() {
    this.isRegisterFormActive = !this.isRegisterFormActive;
    this.isLoginFormActive = false;
  }
}
