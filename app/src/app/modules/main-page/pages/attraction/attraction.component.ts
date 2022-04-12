import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AttractionService } from 'src/app/core/services/attraction/attraction.service';
import { RootState } from 'src/app/core/store/app.states';
import { selectAttractions, selectFilteredAttractions, selectNewAttractions } from 'src/app/core/store/attraction';
import { isUserModerator } from 'src/app/core/store/user';
import { CleanableDirective } from 'src/app/shared/directives/cleanable.directive';

enum ViewSelector {
  ALL = 'ALL',
  CREATOR = 'CREATOR',
  PENDING = 'PENDING'
}

@Component({
  selector: 'majk-attraction',
  templateUrl: './attraction.component.html',
  styleUrls: ['./attraction.component.scss']
})
export class AttractionComponent extends CleanableDirective implements OnInit {
  currentView = ViewSelector.ALL;

  constructor(private attractionService: AttractionService, private store$: Store<RootState>) {
    super();
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

  isModerator = this.store$.select(isUserModerator);
  attractionList$ = this.store$.select(selectFilteredAttractions);
  newAttractionList$ = this.store$.select(selectNewAttractions);

  ngOnInit(): void {
    this.addSubscription(this.attractionService.initData().subscribe());
  }
}
