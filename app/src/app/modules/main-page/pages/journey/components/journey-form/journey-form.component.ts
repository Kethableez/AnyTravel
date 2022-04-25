import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormService } from '@services/form.service';
import { RootState } from '@store/app.states';
import { WizardActions } from '@store/journey';
import { selectCurrentStep, selectWizardData } from '@store/journey/selectors/journey.selectors';
import { combineLatest, of } from 'rxjs';
import { CleanableDirective } from 'src/app/shared/directives/cleanable.directive';

export interface JourneyBase {
  information: any;
  destination: any;
  group: any;
  attractions: any;
  accomodation: any;
}

export enum WizardSteps {
  INFORMATION = 'Information',
  DESTINATION = 'Destination',
  GROUP = 'Group',
  ATTRACTIONS = 'Attractions',
  ACCOMODATION = 'Accomodation',
  SUMMARY = 'Summary'
}
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

  base: JourneyBase = {
    information: {},
    destination: {},
    group: {},
    attractions: [],
    accomodation: {}
  };

  get steps() {
    return WizardSteps;
  }

  setStep(step: WizardSteps) {
    this.step = step;
  }

  submitStep(formData: any, stepKey: string, nextStep: WizardSteps) {
    this.base[stepKey as keyof JourneyBase] = formData;
    this.step = nextStep;
  }

  ngOnInit(): void {
    this.addSubscription(
      combineLatest([this.store$.select(selectWizardData), this.store$.select(selectCurrentStep)]).subscribe(
        ([data, step]) => {
          this.step = step;
          this.base = {
            ...data
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
