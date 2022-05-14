import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '@store/app.states';
import { selectFutureUserJourneys, selectPastUserJourneys, selectUpcomingUserJourneys } from '@store/journey/selectors/journey.selectors'


@Component({
  selector: 'majk-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private store$: Store<RootState>) {}
  
  userJourneys$ = this.store$.select(selectUpcomingUserJourneys);
  futureJourneys$ = this.store$.select(selectFutureUserJourneys);
  pastJourneys$ = this.store$.select(selectPastUserJourneys);

  ngOnInit(): void {}

}