import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/core/services/navigation.service';

@Injectable()
export class HomeNavigationService extends NavigationService {
  constructor(protected override router: Router) {
    super(router);
  }

  get baseUrl(): string {
    return '/home';
  }

  get options(): string[] {
    return ['is-info', 'is-white'];
  }
}
