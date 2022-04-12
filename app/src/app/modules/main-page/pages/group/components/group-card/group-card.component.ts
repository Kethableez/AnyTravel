import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private store$: Store<RootState>) { }

  get groupCover(): string {
    return ['http://localhost:9000/api/file/download', this.group?.cover].join('/');
  }

  ngOnInit(): void {
  }

  deleteGroup() {
    if (this.group) {
      this.store$.dispatch(GroupActions.deleteGroup({ groupId: this.group?.name }));
    }
  }

}
