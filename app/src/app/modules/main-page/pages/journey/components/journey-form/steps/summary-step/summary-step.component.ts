import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '@store/app.states';
import { JourneyBase } from '../../journey-form.component';

@Component({
  selector: 'majk-summary-step',
  templateUrl: './summary-step.component.html',
  styleUrls: ['./summary-step.component.scss']
})
export class SummaryStepComponent implements OnInit {
  constructor(private store$: Store<RootState>) {}

  @Input()
  journey?: JourneyBase;

  valueWrapper(value: any) {
    if (value) {
      return 'Tak';
    }
    return 'Brak';
  }

  ngOnInit(): void {}
}
