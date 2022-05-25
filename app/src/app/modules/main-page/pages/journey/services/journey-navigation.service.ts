import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '@services/navigation.service';

@Injectable()
export class JourneyNavigationService extends NavigationService {
  constructor(protected override router: Router) {
    super(router);
  }

  get baseUrl(): string {
    return '/home/journey';
  }

  get options(): string[] {
    return ['is-active', ''];
  }
}
