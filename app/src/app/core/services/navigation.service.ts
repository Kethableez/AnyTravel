import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { replace } from 'lodash';

@Injectable()
export abstract class NavigationService {
  constructor(protected router: Router) {}

  abstract get baseUrl(): string;

  abstract get options(): string[];

  navigate(url: string) {
    const destinationUrl = [this.baseUrl, url].join('/');
    this.router.navigateByUrl(destinationUrl);
  }

  trim(url: string) {
    const pattern = `${this.baseUrl}/`;
    return replace(url, pattern, '');
  }

  isActive(buttonName: string, activeRoute: string) {
    return activeRoute === buttonName ? this.options[0] : this.options[1];
  }
}
