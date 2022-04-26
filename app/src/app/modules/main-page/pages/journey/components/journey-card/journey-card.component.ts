import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '@store/app.states';

enum CardTab {
  INFORMATION = 'information',
  ATTRACTION = 'attraction',
  ACCOMODATION = 'accomodation'
}

@Component({
  selector: 'majk-journey-card',
  templateUrl: './journey-card.component.html',
  styleUrls: ['./journey-card.component.scss']
})
export class JourneyCardComponent implements OnInit {
  @Input()
  journey: any = {};

  selectedTab = CardTab.INFORMATION;

  constructor(private store$: Store<RootState>) {}

  ngOnInit(): void {}

  get tab() {
    return CardTab;
  }

  selectTab(tab: CardTab) {
    this.selectedTab = tab;
  }

  isActive(tab: CardTab) {
    return this.selectedTab === tab ? 'is-active' : '';
  }

  mapAttractions(attractions: any[]) {
    const dates = [...new Set(attractions.map((attraction: any) => attraction.date.split('T')[0]))] as string[];
    return dates.map((date: string) => {
      return {
        date,
        attractions: attractions.filter((attraction: any) => attraction.date.split('T')[0] === date)
      };
    });
  }
}
