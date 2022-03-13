import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/core/store/app.states';
import { selectUserData } from 'src/app/core/store/user/user.selectors';

@Component({
  selector: 'majk-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(private store$: Store<RootState>) {}

  currentUser$ = this.store$.select(selectUserData);

  ngOnInit(): void {}
}
