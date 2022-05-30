import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Group } from '@models/group/group.model';
import { Store } from '@ngrx/store';
import { CreateGroupPayload } from 'src/app/core/models/group/crate-group-payload';
import { GroupService } from 'src/app/core/services/group/group.service';
import { RootState } from 'src/app/core/store/app.states';
import { GroupActions } from 'src/app/core/store/group';
import { CleanableDirective } from 'src/app/shared/directives/cleanable.directive';

@Component({
  selector: 'majk-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent extends CleanableDirective implements OnInit {

  @Input()
  group?: Group;

  constructor(private store$: Store<RootState>, private service: GroupService, private formBuilder: FormBuilder) { super(); }

  file = new FormData();

  newGroupForm = this.formBuilder.group({
    name: this.group != null ? this.group.name : '',
    cover: this.group != null ? this.group.cover : ''
  });

  ngOnInit(): void {
  }

  createNewGroup() {
    const payload: CreateGroupPayload = {
      ... this.newGroupForm.value,
    };

    this.store$.dispatch(GroupActions.createGroup({ file: this.file, payload: payload }));
    this.newGroupForm.reset();
    this.file.delete('file');
  }

  uploadFile(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.getControl(this.newGroupForm, 'cover').markAsTouched();
      this.newGroupForm.patchValue({
        cover: file.name
      });

      this.file.append('file', file);
    }
  }

  getControl(form: FormGroup, controlName: string) {
    return form.controls[controlName];
  }

}
