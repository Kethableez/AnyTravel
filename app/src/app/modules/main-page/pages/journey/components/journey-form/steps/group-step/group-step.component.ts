import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormService } from '@services/form.service';
import { RootState } from '@store/app.states';
import { selectGroupData } from '@store/group';
import { selectWizardGroup, WizardActions } from '@store/journey';
import { CleanableDirective } from 'src/app/shared/directives/cleanable.directive';

@Component({
  selector: 'majk-group-step',
  templateUrl: './group-step.component.html',
  styleUrls: ['./group-step.component.scss'],
  providers: [FormService]
})
export class GroupStepComponent extends CleanableDirective implements OnInit {
  @Output()
  submitStep = new EventEmitter<any>();

  userGroups$ = this.store$.select(selectGroupData);

  constructor(protected formService: FormService, private builder: FormBuilder, private store$: Store<RootState>) {
    super();
    this.addSubscription(
      this.store$.select(selectWizardGroup).subscribe((group) => {
        if (group) {
          this.selectedGroupId = group.id;
          this.selectedGroupName = group.name;
        }
      })
    );
  }

  selectedGroupId = '';
  selectedGroupName = '';

  ngOnInit(): void {}

  cover(coverRef: string) {
    return coverRef.startsWith('attraction/') ? `http://localhost:9000/api/file/download/${coverRef}` : coverRef;
  }

  isGroupSelected(groupId: string) {
    return this.selectedGroupId === groupId ? 'selected' : '';
  }

  selectGroup(groupId: string, groupName: string) {
    this.selectedGroupId = groupId;
    this.selectedGroupName = groupName;
  }

  nextStep() {
    const formData = { id: this.selectedGroupId, name: this.selectedGroupName };
    this.store$.dispatch(WizardActions.updateWizard({ key: 'group', object: formData }));
    this.submitStep.emit(formData);
  }
}
