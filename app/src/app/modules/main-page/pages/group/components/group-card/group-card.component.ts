import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EditGroupPayload } from '@models/group/edit-group-payload';
import { Store } from '@ngrx/store';
import { Group } from 'src/app/core/models/group/group.model';
import { RootState } from 'src/app/core/store/app.states';
import { GroupActions } from 'src/app/core/store/group';

@Component({
  selector: 'majk-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.scss']
})
export class GroupCardComponent implements OnInit {
  @Input()
  group?: Group;
  formEditEnabled = false;
  formAddUserEnabled = false;


  constructor(private store$: Store<RootState>, private formBuilder: FormBuilder) { }

  file = new FormData();

  editFormGroup = this.formBuilder.group({
    name: this.group != null ? this.group.name : '',
    cover: this.group != null ? this.group.cover : ''
  });

  addUserFormGroup = this.formBuilder.group({
    memberEmail: '',
  });

  getGroupCover(coverRef: string): string {
    return coverRef.startsWith('group/') ? `http://localhost:9000/api/file/download/${coverRef}` : coverRef;
  }

  ngOnInit(): void { }

  deleteGroup(id: string) {
    if (this.group) {
      this.store$.dispatch(GroupActions.deleteGroup({ groupId: id }));
    }
  }

  addUserToGroup() {
    if (this.group && this.addUserFormGroup.value.memberEmail) {
      this.store$.dispatch(GroupActions.addUserToGroup({ groupId: this.group?._id, payload: this.addUserFormGroup.value }));
    }
  }

  toggleFormEdit() {
    this.formEditEnabled = !this.formEditEnabled;
    this.formAddUserEnabled = false;
  }

  toggleFormAdd() {
    this.formAddUserEnabled = !this.formAddUserEnabled;
    this.formEditEnabled = false;
  }

  uploadFile(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.getControl(this.editFormGroup, 'cover').markAsTouched();
      this.editFormGroup.patchValue({
        cover: file.name
      });

      this.file.append('file', file);
    }
  }

  getControl(form: FormGroup, controlName: string) {
    return form.controls[controlName];
  }

  editGroup() {
    if (this.group) {
      if (this.editFormGroup.value.name == '') {
        this.editFormGroup.value.name = this.group.name;
      }
      const payload: EditGroupPayload = {
        ... this.editFormGroup.value,
      };
      console.log(this.group?._id);

      this.store$.dispatch(GroupActions.editGroup({ groupId: this.group?._id, payload: payload }));
      this.file.delete('file');
    }
  }
}
