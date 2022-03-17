import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/core/store/app.states';
import { selectGroupData } from 'src/app/core/store/group';

@Component({
  selector: 'majk-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  constructor(private store$: Store<RootState>) { }

  userGroups$ = this.store$.select(selectGroupData);

  ngOnInit(): void {
  }

}
