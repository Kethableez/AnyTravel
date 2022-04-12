import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from 'src/app/core/models/group/group.model';

@Component({
  selector: 'majk-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  constructor() { }

  @Input()
  userGroups$?: Observable<Group[]>;

  ngOnInit(): void {
  }

}
