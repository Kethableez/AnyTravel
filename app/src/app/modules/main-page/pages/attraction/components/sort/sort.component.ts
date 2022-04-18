import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SortOptions } from '@models/attraction/attraction-filters/sort-options.model';
import { RootState } from '@store/app.states';
import { selectSortingType, AttractionActions } from '@store/attraction';

@Component({
  selector: 'majk-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
  sortType$ = this.store$.select(selectSortingType);

  get SortOptions() {
    return [SortOptions.NAME_ASC, SortOptions.NAME_DESC, SortOptions.RATING_ASC, SortOptions.RATING_DESC];
  }

  constructor(private store$: Store<RootState>) {}

  ngOnInit(): void {}

  changeSortType(event: any) {
    const value = event.target.value as SortOptions;
    if (value) {
      this.store$.dispatch(AttractionActions.sortChange({ option: value }));
    }
  }
}
