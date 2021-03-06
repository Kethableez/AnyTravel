import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from '@store/app.states';
import { selectGroupById } from '@store/group';
import { JourneysActions, selectJourneyById } from '@store/journey';
import { selectUserId } from '@store/user';
import { tap, map, switchMap } from 'rxjs';

@Component({
  selector: 'majk-journey-profile',
  templateUrl: './journey-profile.component.html',
  styleUrls: ['./journey-profile.component.scss']
})
export class JourneyProfileComponent implements OnInit {
  constructor(private route: ActivatedRoute, private store$: Store<RootState>) {}

  userId$ = this.store$.select(selectUserId);

  journey$ = this.route.params.pipe(
    map((params) => params['journeyId']),
    switchMap((id) =>
      this.store$.select(selectJourneyById(id)).pipe(
        map((journey) => {
          return {
            ...journey,
            plan: this.mapAttractions(journey.attractions)
          };
        })
      )
    ),
    switchMap((journey) =>
      this.store$.select(selectGroupById(journey.groupId)).pipe(
        map((group) => {
          return {
            ...journey,
            group
          };
        })
      )
    )
  );

  ngOnInit(): void {}

  getAvatar(avatarRef: string) {
    return avatarRef.startsWith('avatar/') ? `http://localhost:9000/api/file/download/${avatarRef}` : avatarRef;
  }

  mapAttractions(attractions: any[]) {
    const dates = [...new Set(attractions.map((attraction: any) => attraction.date.split('T')[0]))] as string[];
    return dates.map((date: string) => {
      return {
        date,
        attractions: attractions
          .filter((attraction: any) => attraction.date.split('T')[0] === date)
          .sort((a1, a2) => new Date(a1.date).getTime() - new Date(a2.date).getTime())
      };
    });
  }

  isParticipating(memberId: string, participants: any[]) {
    return participants.find((p) => p.memberId === memberId).isParticipating;
  }

  updateParticipation(journeyId: string, memberId: string, value: boolean) {
    const payload = {
      journeyId: journeyId,
      memberId: memberId,
      value: value
    };
    this.store$.dispatch(JourneysActions.updateParticipation({ payload: payload }));
  }
}
