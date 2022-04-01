import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/core/store/app.states';
import { AttractionActions } from 'src/app/core/store/attraction';

@Component({
  selector: 'majk-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  constructor(private store$: Store<RootState>) {}

  ngOnInit(): void {}

  apply(event: any) {
    const query = event.target.value;
    if (query && query !== '') {
      this.store$.dispatch(AttractionActions.searchQueryChange({ query: query }));
    } else {
      this.store$.dispatch(AttractionActions.searchQueryChange({ query: null }));
    }
  }

  clear() {
    this.store$.dispatch(AttractionActions.searchQueryChange({ query: null }));
  }
}
