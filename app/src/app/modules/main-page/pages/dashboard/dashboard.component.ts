import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '@store/app.states';
import {
  selectFutureUserJourneys,
  selectJourneyById,
  selectJourneys,
  selectNotifications,
  selectPastUserJourneys,
  selectUnreadNotifications,
  selectUpcomingUserJourneys
} from '@store/journey/selectors/journey.selectors';
import { Journey } from '@models/journey/journey.model';
import { combineLatest, tap } from 'rxjs';
import { JourneysActions } from '@store/journey';
import { Router } from '@angular/router';

@Component({
  selector: 'majk-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private store$: Store<RootState>, private router: Router) {}

  @Input()
  journey?: Journey;

  notifications$ = this.store$.select(selectNotifications);

  markNotificationAsRead(notificationId: string): void {
    this.store$.dispatch(JourneysActions.markAsRead({ notificationId: notificationId }));
  }

  notifs$ = combineLatest(
    [this.store$.select(selectUnreadNotifications), this.store$.select(selectJourneys)],
    (notifications, journeys) => {
      return notifications.map((notification) => {
        const journey = journeys.find((j) => j._id === notification.journeyId);
        return { ...notification, journeyName: journey.name };
      });
    }
  ).pipe(tap(console.log));
  // selectedJourney = this.store$.select(selectJourneyById(journeyId))

  userJourneys$ = this.store$.select(selectUpcomingUserJourneys);
  futureJourneys$ = this.store$.select(selectFutureUserJourneys);
  pastJourneys$ = this.store$.select(selectPastUserJourneys);

  get journeyCoverFromAttraction(): string {
    return ['http://localhost:9000/api/file/download', this.journey?.cover].join('/');
  }

  ngOnInit(): void {}
  navigate(id: string): void {
    this.router.navigateByUrl(`/home/journey/${id}`);
  }
}
