import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Attraction } from 'src/app/core/models/attraction/attration.model';

@Component({
  selector: 'majk-attraction-list',
  templateUrl: './attraction-list.component.html',
  styleUrls: ['./attraction-list.component.scss']
})
export class AttractionListComponent implements OnInit {
  @Input()
  attractionList$?: Observable<Attraction[]>;

  @Input()
  isModeratorView = false;

  constructor() {}

  ngOnInit(): void {}
}
