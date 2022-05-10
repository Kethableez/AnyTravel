import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { isEmpty } from 'lodash';
import { map, Observable, of, tap } from 'rxjs';
import { Attraction } from '@models/attraction/attration.model';
import { RootState } from '@store/app.states';
import { AttractionActions } from '@store/attraction';
import { selectUserId } from '@store/user';
import { isAttractionSelected } from '@store/journey/selectors/journey.selectors';
import { WizardActions } from '@store/journey';

@Component({
  selector: 'majk-attraction-card',
  templateUrl: './attraction-card.component.html',
  styleUrls: ['./attraction-card.component.scss']
})
export class AttractionCardComponent implements OnInit {
  @Input()
  attraction?: Attraction;

  @Input()
  isModeratorView = false;

  constructor(private store$: Store<RootState>) {}

  get attractionCover(): string {
    return ['http://localhost:9000/api/file/download', this.attraction?.cover].join('/');
  }

  isAttractionSelected$: Observable<boolean> = of(false);

  valueWrapper(value: string | undefined | null) {
    if (value) return value;
    return '---';
  }

  ngOnInit(): void {
    if (this.attraction) {
      this.isAttractionSelected$ = this.store$
        .select(isAttractionSelected(this.attraction?._id))
        .pipe(tap(console.log));
    }
  }

  get reviews() {
    if (this.attraction && this.attraction.reviews.length > 0) {
      const all = this.attraction.reviews.length;
      const sum = this.attraction.reviews
        .map((r) => r.review)
        .reduce(function (a, b) {
          return a + b;
        });

      return { all, sum };
    }

    return { all: 0, sum: 0 };
  }

  approveAttraction() {
    if (this.attraction) {
      this.store$.dispatch(AttractionActions.approveAttraction({ attractionId: this.attraction?._id }));
    }
  }

  deleteAttraction() {
    if (this.attraction) {
      this.store$.dispatch(AttractionActions.deleteAttraction({ attractionId: this.attraction?._id }));
    }
  }

  addReview(review: number) {
    if (this.attraction) {
      const payload = { review: review };
      this.store$.dispatch(AttractionActions.addReview({ attractionId: this.attraction._id, payload: payload }));
    }
  }

  addAttractionToJourney(id: string, name: string) {
    this.store$.dispatch(WizardActions.addAttraction({ attractionId: id, name: name }));
  }

  removeAttractionFromJourney(id: string) {
    this.store$.dispatch(WizardActions.removeAttraction({ attractionId: id }));
  }

  enableRating(): Observable<boolean> {
    return this.store$.pipe(
      select(selectUserId),
      map((userId) => {
        if (userId && this.attraction) {
          return isEmpty(this.attraction.reviews.filter((r) => r.userId === userId));
        } else return false;
      })
    );
  }
}
