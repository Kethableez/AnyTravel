import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from '@store/app.states';
import { selectIsLoggedIn } from '@store/auth';
import { CleanableDirective } from 'src/app/shared/directives/cleanable.directive';
import { StartNavigationService } from './services/start-navigation.service';

@Component({
  selector: 'majk-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  providers: [StartNavigationService]
})
export class LandingPageComponent extends CleanableDirective implements OnInit {
  activeRoute = '';

  constructor(
    private store$: Store<RootState>,
    private router: Router,
    protected navigationService: StartNavigationService
  ) {
    super();
    this.addSubscription(
      this.router.events.subscribe((v) => {
        if (v instanceof NavigationEnd) {
          this.activeRoute = this.navigationService.trim(v.url);
        }
      })
    );
  }

  ngOnInit(): void {
    this.store$.select(selectIsLoggedIn).subscribe((isLoggedIn) => {
      if (isLoggedIn) this.router.navigateByUrl('/home');
    });
  }

  navigate(url: string) {
    this.navigationService.navigate(url);
  }

  isActive(buttonName: string) {
    return this.navigationService.isActive(buttonName, this.activeRoute);
  }
}
