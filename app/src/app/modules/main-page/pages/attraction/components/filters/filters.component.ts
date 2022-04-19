import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs';
import { FilterInput } from '@models/attraction/attraction-filters/filter-input.model';
import { RootState } from '@store/app.states';
import { AttractionActions, selectFilters } from '@store/attraction';

@Component({
  selector: 'majk-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  filters$ = this.store$.select(selectFilters).pipe(first());

  constructor(private store$: Store<RootState>) {}

  ngOnInit(): void {}

  filterChange(event: FilterInput) {
    this.store$.dispatch(AttractionActions.filterChange({ filterInput: event }));
  }
}
