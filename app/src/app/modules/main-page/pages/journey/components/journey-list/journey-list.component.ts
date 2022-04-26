import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '@store/app.states';
import { selectUserJourneys } from '@store/journey/selectors/journey.selectors';

@Component({
  selector: 'majk-journey-list',
  templateUrl: './journey-list.component.html',
  styleUrls: ['./journey-list.component.scss']
})
export class JourneyListComponent implements OnInit {
  constructor(private store$: Store<RootState>) {}

  journeys$ = this.store$.select(selectUserJourneys);

  ngOnInit(): void {}
}
