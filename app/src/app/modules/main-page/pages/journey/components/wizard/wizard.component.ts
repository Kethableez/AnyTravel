import { Component, OnInit } from '@angular/core';
import { WizardStep } from '@models/journey/wizard-step.model';
import { Store } from '@ngrx/store';
import { RootState } from '@store/app.states';
import { JourneysActions, selectIsWizardEnabled, WizardActions } from '@store/journey';
import { tap } from 'rxjs';

@Component({
  selector: 'majk-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {
  constructor(private store$: Store<RootState>) {}

  isWizardEnabled = this.store$.select(selectIsWizardEnabled);

  ngOnInit(): void {}

  setStep(step: WizardStep) {
    this.store$.dispatch(WizardActions.setStep({ step: step }));
  }

  get step() {
    return WizardStep;
  }
}
