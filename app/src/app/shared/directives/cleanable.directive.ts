import { Directive, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[majkCleanable]'
})
export class CleanableDirective implements OnDestroy {
  subscriptions: Subscription[] = [];

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  addSubscription(subscription: Subscription): void {
    this.subscriptions.push(subscription);
  }
}
