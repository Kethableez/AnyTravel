import { Component, OnInit } from '@angular/core';
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
  currentView = ViewSelector.CREATOR;

  constructor() {
    super();
  }

  ngOnInit(): void {}

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
