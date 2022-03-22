import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AttractionService } from 'src/app/core/services/attraction/attraction.service';
import { RootState } from 'src/app/core/store/app.states';
import { selectAttractions, selectNewAttractions } from 'src/app/core/store/attraction';
import { isUserModerator } from 'src/app/core/store/user';
import { CleanableDirective } from 'src/app/shared/directives/cleanable.directive';

@Component({
  selector: 'majk-attraction',
  templateUrl: './attraction.component.html',
  styleUrls: ['./attraction.component.scss']
})
export class AttractionComponent extends CleanableDirective implements OnInit {
  constructor(private attractionService: AttractionService, private store$: Store<RootState>) {
    super();
  }

  isModerator = this.store$.select(isUserModerator);
  attractionList$ = this.store$.select(selectAttractions);
  newAttractionList$ = this.store$.select(selectNewAttractions);

  ngOnInit(): void {
    this.addSubscription(this.attractionService.initData().subscribe());
  }
}
