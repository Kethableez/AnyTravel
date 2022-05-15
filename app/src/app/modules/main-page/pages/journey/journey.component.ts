import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from '@store/app.states';
import { JourneysActions } from '@store/journey';
import { CleanableDirective } from 'src/app/shared/directives/cleanable.directive';
import { JourneyNavigationService } from './services/journey-navigation.service';

enum ViewSelector {
  ALL = 'all',
  CREATOR = 'creator',
  PROFILE = 'profile'
}

@Component({
  selector: 'majk-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss'],
  providers: [JourneyNavigationService]
})
export class JourneyComponent extends CleanableDirective implements OnInit {
  currentView = ViewSelector.ALL;

  constructor(
    private store$: Store<RootState>,
    private router: Router,
    private navigationService: JourneyNavigationService
  ) {
    super();
    this.router.events.subscribe((v) => {
      if (v instanceof NavigationEnd) {
        const path = this.navigationService.trim(v.url);
        if (path === 'creator') this.currentView = ViewSelector.CREATOR;
        else if (path === 'all') this.currentView = ViewSelector.ALL;
        else this.currentView = ViewSelector.PROFILE;
      }
    });
  }

  ngOnInit(): void {
    this.store$.dispatch(JourneysActions.getUserJourneys());
  }

  changeView(selector: ViewSelector) {
    this.currentView = selector;
  }

  // isViewActive(selector: ViewSelector) {
  //   return this.currentView === selector ? 'is-active' : '';
  // }

  isActive(buttonName: string) {
    return this.navigationService.isActive(buttonName, this.currentView);
  }

  navigate(url: string) {
    this.navigationService.navigate(url);
  }

  get ViewSelector() {
    return ViewSelector;
  }
}
