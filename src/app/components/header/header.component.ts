import { Component, OnInit } from '@angular/core';
import {AnimalStoreService} from '@services/animal-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public totalAnimals = 0;
  constructor(private service: AnimalStoreService) { }

  ngOnInit(): void {
    this.service.getAnimals$().subscribe(animals => this.totalAnimals = animals.length);
  }

  onAddNewItem(): void {
    this.service.addNewAnimal();
  }

}
