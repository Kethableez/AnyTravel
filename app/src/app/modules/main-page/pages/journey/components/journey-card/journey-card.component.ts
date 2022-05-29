import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from '@store/app.states';
import { Observable, of, tap, timer } from 'rxjs';

@Component({
  selector: 'majk-journey-card',
  templateUrl: './journey-card.component.html',
  styleUrls: ['./journey-card.component.scss']
})
export class JourneyCardComponent implements OnInit {
  @Input()
  journey: any = {};

  images: string[] = [];
  image = '';

  index = 0;

  constructor(private store$: Store<RootState>, private router: Router) {}

  ngOnInit(): void {
    if (this.journey) {
      this.images = this.journey.attractions.map((attraction: any) => this.getAttractionCover(attraction.cover));
    }

    timer(0, 5000).subscribe((val) => {
      this.image = this.images[this.index];
      if (this.index === this.journey.attractions.length - 1) {
        this.index = 0;
      } else {
        this.index++;
      }
    });
  }

  navigate(id: string) {
    this.router.navigateByUrl(`/home/journey/${id}`);
  }

  getAttractionCover(coverRef: string): string {
    return coverRef.startsWith('attraction/') ? `http://localhost:9000/api/file/download/${coverRef}` : coverRef;
  }
}
