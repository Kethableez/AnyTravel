import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterInput } from 'src/app/core/models/attraction/attraction-filters/filter-input.model';
import { InputValue } from 'src/app/core/models/attraction/attraction-filters/input-value.model';

@Component({
  selector: 'majk-filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.scss']
})
export class FilterInputComponent {
  @Input()
  filter?: FilterInput;

  @Output()
  filterChange = new EventEmitter<FilterInput>();

  constructor() {}

  // searchValue(event: any) {
  //   const inputValue = event.target.value;
  //   if (this.filter) {
  //     const newVal = {
  //       value: inputValue,
  //       enabled: inputValue !== ''
  //     };

  //     this.onFitlerChange(newVal);
  //   }
  // }

  changeValue(event: any) {
    const inputValue = event.target.value;
    if (this.filter) {
      const newVals = (this.filter.input as InputValue[]).map((v) => {
        return {
          ...v,
          enabled: v.value === inputValue
        };
      });

      this.onFitlerChange(newVals);
    }
  }

  get inputList() {
    if (this.filter) {
      return this.filter.input as InputValue[];
    } else return [] as InputValue[];
  }

  toggleValue(value: string | number | boolean) {
    const inputValue = value;

    if (this.filter) {
      const newVals = (this.filter.input as InputValue[]).map((input) => {
        return {
          ...input,
          enabled: input.value === inputValue ? !input.enabled : input.enabled
        };
      });

      this.onFitlerChange(newVals);
    }
  }

  onFitlerChange(changedInput: InputValue[]) {
    if (this.filter && changedInput) {
      this.filter = {
        ...this.filter,
        input: changedInput
      };

      this.filterChange.emit(this.filter);
    }
  }
}
