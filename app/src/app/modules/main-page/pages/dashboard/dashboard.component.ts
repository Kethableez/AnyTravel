import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '@store/app.states';
import { selectFutureUserJourneys, selectPastUserJourneys, selectUpcomingUserJourneys } from '@store/journey/selectors/journey.selectors'
import { Journey } from '@models/journey/journey.model';


@Component({
  selector: 'majk-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private store$: Store<RootState>) {}
  
  @Input()
  journey?: Journey;
  
  userJourneys$ = this.store$.select(selectUpcomingUserJourneys);
  futureJourneys$ = this.store$.select(selectFutureUserJourneys);
  pastJourneys$ = this.store$.select(selectPastUserJourneys);

  get journeyCoverFromAttraction(): string {
    return ['http://localhost:9000/api/file/download', this.journey?.cover].join('/');
  }

  ngOnInit(): void {}

}
