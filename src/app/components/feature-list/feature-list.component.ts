import {Component, Input, OnInit} from '@angular/core';
import {AnimalStoreService} from '@services/animal-store.service';
import {map, skip} from 'rxjs/operators';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss']
})
export class FeatureListComponent implements OnInit {

  @Input() type: string;
  listOfOptions: string[];
  constructor(private service: AnimalStoreService) { }

  ngOnInit(): void {
    this.service.getCategories$()
      .pipe(skip(1), map((categories: Map<string, Array<string>>)  => {
        return Array.from(categories.get(this.type));
      } ))
      .subscribe((listOfOptions: string[]) => {
        this.listOfOptions = listOfOptions;
      });
  }

  onItemClick(option: string): void {
    this.service.onItemClick(option, this.type);
  }

  getKey(option: string): string {
    return this.service.getItemKey(option, this.type);
  }

}
