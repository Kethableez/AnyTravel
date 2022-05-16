import { Component, OnInit } from '@angular/core';
import { DisplayType } from '@models/journey/display-type.model';
import { Store } from '@ngrx/store';
import { RootState } from '@store/app.states';
import { JourneysActions } from '@store/journey';
import { selectDisplayType, selectUserJourneys } from '@store/journey/selectors/journey.selectors';

@Component({
  selector: 'majk-journey-list',
  templateUrl: './journey-list.component.html',
  styleUrls: ['./journey-list.component.scss']
})
export class JourneyListComponent implements OnInit {
  constructor(private store$: Store<RootState>) {}

  journeys$ = this.store$.select(selectUserJourneys);

  get DisplayType() {
    return [DisplayType.ALL, DisplayType.FUTURE, DisplayType.PAST];
  }

  displayType$ = this.store$.select(selectDisplayType);

  ngOnInit(): void {}

  changeDisplayType(event: any) {
    console.log(event.target);
    const value = event.target.value as DisplayType;
    console.log(value);
    if (value) {
      this.store$.dispatch(JourneysActions.displayTypeChange({ option: value }));
    }
  }

  applyQuery(event: any) {
    const query = event.target.value;
    if (query && query !== '') {
      this.store$.dispatch(JourneysActions.searchQueryChange({ query: query }));
    } else {
      this.store$.dispatch(JourneysActions.searchQueryChange({ query: null }));
    }
  }
}
