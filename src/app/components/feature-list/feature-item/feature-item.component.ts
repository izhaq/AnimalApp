import {Component, Input, OnInit} from '@angular/core';
import {AnimalStoreService} from '@services/animal-store.service';

@Component({
  selector: 'app-feature-item',
  templateUrl: './feature-item.component.html',
  styleUrls: ['./feature-item.component.scss']
})
export class FeatureItemComponent implements OnInit {

  @Input() feature: string;
  @Input() key: string;
  public isAffected = false;
  constructor(private service: AnimalStoreService) {

  }

  ngOnInit(): void {
    this.service.getAffectedItems$().subscribe(affectedItems => this.isAffected = affectedItems.has(this.key));
  }

}
