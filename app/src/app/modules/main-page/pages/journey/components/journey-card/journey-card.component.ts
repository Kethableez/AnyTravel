import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from '@store/app.states';

@Component({
  selector: 'majk-journey-card',
  templateUrl: './journey-card.component.html',
  styleUrls: ['./journey-card.component.scss']
})
export class JourneyCardComponent implements OnInit {
  @Input()
  journey: any = {};

  constructor(private store$: Store<RootState>, private router: Router) {}

  ngOnInit(): void {}

  navigate(id: string) {
    this.router.navigateByUrl(`/home/journey/${id}`);
  }

  // mapAttractions(attractions: any[]) {
  //   const dates = [...new Set(attractions.map((attraction: any) => attraction.date.split('T')[0]))] as string[];
  //   return dates.map((date: string) => {
  //     return {
  //       date,
  //       attractions: attractions.filter((attraction: any) => attraction.date.split('T')[0] === date)
  //     };
  //   });
  // }
}
