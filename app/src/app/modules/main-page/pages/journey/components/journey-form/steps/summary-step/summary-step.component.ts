import { Component, Input, OnInit } from '@angular/core';
import { JourneyBase } from '@models/journey/wizard-data.model';
import { Store } from '@ngrx/store';
import { RootState } from '@store/app.states';

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
