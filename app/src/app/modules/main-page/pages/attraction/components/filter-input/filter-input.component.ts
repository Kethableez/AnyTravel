import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { includes } from 'lodash';
import { FilterInput } from 'src/app/core/models/attraction/attraction-filter.model';

@Component({
  selector: 'majk-filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.scss']
})
export class FilterInputComponent implements OnInit {
  @Input()
  filter?: FilterInput;

  @Output()
  filterChange = new EventEmitter<FilterInput>();

  constructor() {}

  changeValue(event: any) {
    const inputValue = event.target.value;

    if (this.filter && inputValue) {
      const changedFilter: FilterInput = {
        ...this.filter,
        value: inputValue,
        enabled: inputValue !== ''
      };
      this.filter = changedFilter;
      this.onFitlerChange();
    }
  }

  addValue(value: string) {
    const inputValue = value;

    if (this.filter && inputValue) {
      const values = includes(this.filter.value, value)
        ? this.filter.value.filter((v: string) => v !== value)
        : [...this.filter.value, value];

      const changedFilter: FilterInput = {
        ...this.filter,
        value: values,
        enabled: values.length > 0
      };
      this.filter = changedFilter;
      this.onFitlerChange();
    }
  }

  onFitlerChange() {
    if (this.filter) {
      this.filterChange.emit(this.filter);
    }
  }

  ngOnInit(): void {}
}
