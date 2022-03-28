import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';
import { FilterInput } from 'src/app/core/models/attraction/attraction-filter.model';
import { RootState } from 'src/app/core/store/app.states';
import { AttractionActions, selectFilters } from 'src/app/core/store/attraction';

@Component({
  selector: 'majk-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  keys = ['city', 'country', 'category', 'reviewRatio', 'attractionType', 'isPaid'];

  filters$ = this.store$.select(selectFilters);

  constructor(private store$: Store<RootState>) {}

  ngOnInit(): void {}

  filterChange(event: FilterInput) {
    this.store$.dispatch(AttractionActions.filterChange({ filterInput: event }));
  }
}
