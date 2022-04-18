import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/core/services/navigation.service';

@Injectable()
export class StartNavigationService extends NavigationService {
  constructor(protected override router: Router) {
    super(router);
  }

  get baseUrl(): string {
    return '/start';
  }

  get options(): string[] {
    return ['', 'is-outlined'];
  }
}
