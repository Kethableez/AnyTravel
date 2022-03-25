import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { isEmpty } from 'lodash';
import { map, Observable } from 'rxjs';
import { Attraction } from 'src/app/core/models/attraction/attration.model';
import { RootState } from 'src/app/core/store/app.states';
import { AttractionActions } from 'src/app/core/store/attraction';
import { selectUserId } from 'src/app/core/store/user';

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

  ngOnInit(): void {}

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
