import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/core/store/app.states';
import { AuthActions } from 'src/app/core/store/auth';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'majk-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  constructor(private store$: Store<RootState>) { }

  ngOnInit(): void { }

  logout() {
    this.store$.dispatch(AuthActions.logout());
  }
}
