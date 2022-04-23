import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { FormService } from '@services/form.service';
import { RootState } from '@store/app.states';
import { selectAttractionByIds } from '@store/attraction';
import { selectGroupData } from '@store/group';
import { selectAttractions, selectGroup } from '@store/journey/selectors/journey.selectors';
import { switchMap } from 'rxjs';

@Component({
  selector: 'majk-journey-form',
  templateUrl: './journey-form.component.html',
  styleUrls: ['./journey-form.component.scss'],
  providers: [FormService]
})
export class JourneyFormComponent implements OnInit {
  constructor(protected formService: FormService, private builder: FormBuilder, private store$: Store<RootState>) {}

  selectedAttractions$ = this.store$.pipe(
    select(selectAttractions),
    switchMap((ids) => this.store$.select(selectAttractionByIds(ids)))
  );

  selectedGroup$ = this.store$.select(selectGroup);
  userGroups$ = this.store$.select(selectGroupData);

  ngOnInit(): void {}
}
