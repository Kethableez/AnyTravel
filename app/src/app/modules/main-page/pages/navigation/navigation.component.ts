import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from '@store/app.states';
import { AuthActions } from '@store/auth';
import { CleanableDirective } from 'src/app/shared/directives/cleanable.directive';
import { HomeNavigationService } from '../../services/home-navigation.service';

@Component({
  selector: 'majk-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  providers: [HomeNavigationService]
})
export class NavigationComponent extends CleanableDirective {
  constructor(
    protected navigationService: HomeNavigationService,
    private store$: Store<RootState>,
    private router: Router
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

  activeRoute = '';

  logout() {
    this.store$.dispatch(AuthActions.logout());
  }

  navigate(url: string) {
    this.navigationService.navigate(url);
  }

  isActive(buttonName: string) {
    return this.navigationService.isActive(buttonName, this.activeRoute);
  }
}
