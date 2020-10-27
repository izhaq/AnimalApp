import {Component, OnInit} from '@angular/core';
import {AnimalStoreService} from '@services/animal-store.service';
import {skip} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  counters = {};

  constructor(private service: AnimalStoreService) {}

  ngOnInit(): void {
    this.service.init();
    this.service.getCounters$().pipe(skip(1)).subscribe(counters => this.counters = counters);
  }
}
