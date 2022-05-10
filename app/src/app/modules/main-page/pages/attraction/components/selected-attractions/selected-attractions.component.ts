import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RootState } from '@store/app.states';
import { selectAttractionByIds } from '@store/attraction';
import { WizardActions } from '@store/journey';
import { selectWizardAttractions } from '@store/journey/selectors/journey.selectors';
import { first, switchMap } from 'rxjs';

@Component({
  selector: 'majk-selected-attractions',
  templateUrl: './selected-attractions.component.html',
  styleUrls: ['./selected-attractions.component.scss']
})
export class SelectedAttractionsComponent implements OnInit {
  selectedAttractions$ = this.store$.select(selectWizardAttractions);

  constructor(private store$: Store<RootState>) {}

  ngOnInit(): void {}

  removeAttraction(id: string) {
    this.store$.dispatch(WizardActions.removeAttraction({ attractionId: id }));
  }

  removeAll() {
    this.store$.dispatch(WizardActions.removeAttractions());
  }
}
