import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { FormService } from '@services/form.service';
import { RootState } from '@store/app.states';
import { selectAttractionByIds } from '@store/attraction';
import { WizardActions } from '@store/journey';
import { selectAttractions, selectWizardState } from '@store/journey/selectors/journey.selectors';
import { combineLatest, first, switchMap } from 'rxjs';
import { CleanableDirective } from 'src/app/shared/directives/cleanable.directive';

@Component({
  selector: 'majk-attractions-step',
  templateUrl: './attractions-step.component.html',
  styleUrls: ['./attractions-step.component.scss']
})
export class AttractionsStepComponent extends CleanableDirective implements OnInit {
  selectedAttractions$ = this.store$.pipe(
    select(selectAttractions),
    first(),
    switchMap((ids) => this.store$.select(selectAttractionByIds(ids)))
  );

  constructor(protected formService: FormService, private builder: FormBuilder, private store$: Store<RootState>) {
    super();
    this.addSubscription(
      combineLatest([this.store$.select(selectWizardState('attractions')), this.selectedAttractions$]).subscribe(
        ([attractions, selectedAttractions]) => {
          if (this.attractions.controls.length === 0) {
            if (attractions.length !== 0) {
              attractions.forEach((attraction: any) => {
                this.patchAttraction(attraction);
              });
            } else {
              selectedAttractions.forEach((attraction: any) => {
                this.updateAttraction(attraction._id, attraction.name);
              });
            }
          }
        }
      )
    );
  }

  @Output()
  submitStep = new EventEmitter<any>();

  attractions = this.builder.array([]);

  getFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  updateAttraction(attractionId: string, attractionName: string) {
    const attractionForm = this.builder.group({
      id: [attractionId, Validators.required],
      name: [attractionName, Validators.required],
      date: ['', Validators.required],
      duration: ['', Validators.required],
      additionalInfo: ['', Validators.required]
    });

    this.attractions.push(attractionForm);
  }

  patchAttraction(attraction: any) {
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
