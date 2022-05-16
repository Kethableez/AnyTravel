import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Attraction } from '@models/journey/attraction.model';
import { Store } from '@ngrx/store';
import { FormService } from '@services/form.service';
import { RootState } from '@store/app.states';
import { WizardActions } from '@store/journey';
import { selectWizardAttractions } from '@store/journey/selectors/journey.selectors';
import { CleanableDirective } from 'src/app/shared/directives/cleanable.directive';

@Component({
  selector: 'majk-attractions-step',
  templateUrl: './attractions-step.component.html',
  styleUrls: ['./attractions-step.component.scss']
})
export class AttractionsStepComponent extends CleanableDirective implements OnInit {
  constructor(protected formService: FormService, private builder: FormBuilder, private store$: Store<RootState>) {
    super();
    this.addSubscription(
      this.store$.select(selectWizardAttractions).subscribe((attractions: Attraction[]) => {
        attractions.forEach((attraction) => this.patchAttraction(attraction));
      })
    );
  }

  @Output()
  submitStep = new EventEmitter<any>();

  attractions = this.builder.array([]);

  getFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  patchAttraction(attraction: Attraction) {
    const attractionForm = this.builder.group({
      id: [attraction.id, Validators.required],
      name: [attraction.name, Validators.required],
      date: [attraction.date, Validators.required],
      duration: [attraction.duration, Validators.required],
      additionalInfo: [attraction.additionalInfo, Validators.required]
    });

    this.attractions.push(attractionForm);
  }

  isFieldValid(fieldName: string, form: FormGroup) {
    return this.formService.isFieldValid(fieldName, form);
  }

  isErrorEnabled(fieldName: string, form: FormGroup) {
    return this.formService.errorEnabled(fieldName, form);
  }

  getError(fieldName: string, form: FormGroup): string[] {
    return this.formService.getErrorKey(fieldName, form);
  }

  nextStep() {
    const formData = this.attractions.value;
    this.store$.dispatch(WizardActions.updateWizard({ key: 'attractions', object: formData }));
    this.submitStep.emit(formData);
  }

  ngOnInit(): void {}
}
