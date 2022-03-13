import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserActions } from 'src/app/core/store/user';
import { RootState } from 'src/app/core/store/app.states';
import { User } from 'src/app/core/models/user/user.model';


@Component({
  selector: 'majk-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private store$: Store<RootState>, private currentUser: Store<User>) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void { this.store$.dispatch(UserActions.getData()); }

}
