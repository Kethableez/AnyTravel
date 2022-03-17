import { Component, OnInit } from '@angular/core';
import { GroupService, GroupActions } from 'src/app/core/services/group/group.service';

@Component({
  selector: 'majk-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  constructor(private _groupService: GroupService) { }

  ngOnInit(): void {
  }

}
