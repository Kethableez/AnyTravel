import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/core/store/app.states';
import { AuthActions } from 'src/app/core/store/auth';
import { replace } from 'lodash-es';
import { CleanableDirective } from 'src/app/shared/directives/cleanable.directive';

const BASE = '/home';

@Component({
  selector: 'majk-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent extends CleanableDirective {
  constructor(private store$: Store<RootState>, private router: Router, private route: ActivatedRoute) {
    super();
    this.addSubscription(
      this.router.events.subscribe((v) => {
        if (v instanceof NavigationEnd) {
          this.activeRoute = this.trim(v.url);
        }
      })
    );
  }

  activeRoute = '';

  logout() {
    this.store$.dispatch(AuthActions.logout());
  }

  navigate(url: string) {
    const destinationUrl = [BASE, url].join('/');
    this.router.navigateByUrl(destinationUrl);
  }

  trim(url: string) {
    const pattern = '/home/';
    return replace(url, pattern, '');
  }

  isActive(buttonName: string) {
    return this.activeRoute === buttonName ? 'is-info' : 'is-white';
  }
}
