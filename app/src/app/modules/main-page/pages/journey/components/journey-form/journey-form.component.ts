import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { JourneyBase } from '@models/journey/wizard-data.model';
import { WizardStep } from '@models/journey/wizard-step.model';
import { Store } from '@ngrx/store';
import { FormService } from '@services/form.service';
import { RootState } from '@store/app.states';
import { WizardActions } from '@store/journey';
import { selectCurrentStep, selectWizardData } from '@store/journey/selectors/journey.selectors';
import { combineLatest, of } from 'rxjs';
import { CleanableDirective } from 'src/app/shared/directives/cleanable.directive';

@Component({
  selector: 'majk-journey-form',
  templateUrl: './journey-form.component.html',
  styleUrls: ['./journey-form.component.scss'],
  providers: [FormService]
})
export class JourneyFormComponent extends CleanableDirective implements OnInit {
  constructor(protected formService: FormService, private builder: FormBuilder, private store$: Store<RootState>) {
    super();
  }

  step = this.steps.INFORMATION;
  infoStep = of(false);

  base!: JourneyBase;

  get steps() {
    return WizardStep;
  }

  setStep(step: WizardStep) {
    this.step = step;
  }

  submitStep(formData: any, stepKey: string, nextStep: WizardStep) {
    this.base[stepKey as keyof JourneyBase] = formData;
    this.step = nextStep;
  }

  ngOnInit(): void {
    this.addSubscription(
      combineLatest([this.store$.select(selectWizardData), this.store$.select(selectCurrentStep)]).subscribe(
        ([data, step]) => {
          this.step = step;
          this.base = {
            ...(data as JourneyBase)
          };
        }
      )
    );
  }

  createJourney() {
    const payload = this.base;

    this.store$.dispatch(WizardActions.createJourney({ journeyPayload: payload }));
  }

  clearJourney() {
    this.store$.dispatch(WizardActions.clearWizard());
  }
}
