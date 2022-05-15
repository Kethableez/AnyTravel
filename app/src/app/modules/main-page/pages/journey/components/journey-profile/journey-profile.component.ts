import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from '@store/app.states';
import { selectJourneyById } from '@store/journey';
import { tap, map, switchMap } from 'rxjs';

@Component({
  selector: 'majk-journey-profile',
  templateUrl: './journey-profile.component.html',
  styleUrls: ['./journey-profile.component.scss']
})
export class JourneyProfileComponent implements OnInit {
  constructor(private route: ActivatedRoute, private store$: Store<RootState>) {}

  journey$ = this.route.params.pipe(
    map((params) => params['journeyId']),
    switchMap((id) => this.store$.select(selectJourneyById(id)))
  );

  ngOnInit(): void {}
}
