import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormService } from '@services/form.service';
import { RootState } from '@store/app.states';
import { WizardActions } from '@store/journey';
import { selectWizardDestination } from '@store/journey/selectors/journey.selectors';
import { CleanableDirective } from 'src/app/shared/directives/cleanable.directive';

@Component({
  selector: 'majk-destination-step',
  templateUrl: './destination-step.component.html',
  styleUrls: ['./destination-step.component.scss'],
  providers: [FormService]
})
export class DestinationStepComponent extends CleanableDirective implements OnInit {
  constructor(private formService: FormService, private builder: FormBuilder, private store$: Store<RootState>) {
    super();
    this.addSubscription(
      this.store$.select(selectWizardDestination).subscribe((destination) => {
        if (destination) this.destinationForm.patchValue(destination);
      })
    );
  }

  @Output()
  submitStep = new EventEmitter<any>();

  destinationForm = this.builder.group({
    country: ['', Validators.required],
    zipCode: ['', Validators.required],
    city: ['', Validators.required]
  });

  ngOnInit(): void {}

  isFieldValid(fieldName: string) {
    return this.formService.isFieldValid(fieldName, this.destinationForm);
  }

  isErrorEnabled(fieldName: string) {
    return this.formService.errorEnabled(fieldName, this.destinationForm);
  }

  getError(fieldName: string) {
    return this.formService.getErrorKey(fieldName, this.destinationForm);
  }

  nextStep() {
    const formData = this.destinationForm.value;
    this.store$.dispatch(WizardActions.updateWizard({ key: 'destination', object: formData }));
    this.submitStep.emit(formData);
  }
}
