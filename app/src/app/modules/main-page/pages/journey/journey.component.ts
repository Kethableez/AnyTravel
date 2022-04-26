import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '@store/app.states';
import { JourneysActions } from '@store/journey';
import { CleanableDirective } from 'src/app/shared/directives/cleanable.directive';

enum ViewSelector {
  ALL = 'ALL',
  CREATOR = 'CREATOR'
}

@Component({
  selector: 'majk-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss']
})
export class JourneyComponent extends CleanableDirective implements OnInit {
  currentView = ViewSelector.ALL;

  constructor(private store$: Store<RootState>) {
    super();
  }

  ngOnInit(): void {
    this.store$.dispatch(JourneysActions.getUserJourneys());
  }

  changeView(selector: ViewSelector) {
    this.currentView = selector;
  }

  isViewActive(selector: ViewSelector) {
    return this.currentView === selector ? 'is-active' : '';
  }

  get ViewSelector() {
    return ViewSelector;
  }
}
