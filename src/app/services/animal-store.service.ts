import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Animal} from '@models/Animals';
import {BehaviorSubject, Observable} from 'rxjs';

const GET_ANIMALS_URL = 'http://localhost:3000/getAnimalsList';

@Injectable({
  providedIn: 'root'
})

export class AnimalStoreService {
  private animals = new BehaviorSubject<Array<Animal>>([]);
  private categoriesFormattedData = new Map<string, Map<string, Map<string, boolean>>>();
  private categories = new BehaviorSubject<Map<string, Array<string>>>(new Map());
  private counters = new BehaviorSubject<{}>({});
  private affectedItems = new BehaviorSubject<Map<string, boolean>>(new Map());

  constructor(private http: HttpClient) {}

  private initCategories(): void {
    this.categoriesFormattedData.set('type', new Map<string, Map<string, boolean>>());
    this.categoriesFormattedData.set('color', new Map<string, Map<string, boolean>>());
    this.categoriesFormattedData.set('weight', new Map<string, Map<string, boolean>>());
    this.categoriesFormattedData.set('length', new Map<string, Map<string, boolean>>());
  }

  private getAnimals(): void {
    this.http.get<Array<Animal>>(GET_ANIMALS_URL).subscribe((response => {
      this.animals.next(response);
      this.updateCategories();
    }));
  }

  private updateCategories(): void {
    this.animals.subscribe((animals: Array<Animal>) => {
      animals.map((animal: Animal) => {
        this.updateCategory(animal);
      });
      this.setCategoriesDataForView();
    });
  }

  private updateCategory(animal: Animal): void {
    Object.entries(animal).forEach(([categoryKey, categoryValue]) => {
      if (!this.categoriesFormattedData.get(categoryKey).has(categoryValue)){
        this.categoriesFormattedData.get(categoryKey).set(categoryValue, new Map<string, boolean>());
      }
      this.updateFeature(categoryKey, animal);
    });
  }

  private updateFeature(category: string, animal: Animal): void {
    const featureMap = this.categoriesFormattedData.get(category).get(animal[category]);
    Object.entries(animal).forEach( ([key, value]) => featureMap.set(this.getItemKey(value, key), true));
  }

  private setCategoriesDataForView(): void {
    const viewData = new Map<string, Array<string>>();
    const viewCounters = {};
    this.categoriesFormattedData.forEach( (value, key) => {
      const options = Array.from(value.keys());
      viewData.set(key, options);
      viewCounters[key] = { total: options.length,  description: key};
    });
    this.categories.next(viewData);
    this.counters.next(viewCounters);
  }

  init(): void{
    this.initCategories();
    this.getAnimals();
  }

  getItemKey(option: string, type: string): string {
    return `${type}:${option}`;
  }

  getAnimals$(): Observable<Array<Animal>>{
    return this.animals.asObservable();
  }

  getCategories$(): Observable<Map<string, Array<string>>> {
    return this.categories.asObservable();
  }

  getCounters$(): Observable<{}> {
    return this.counters.asObservable();
  }

  getAffectedItems$(): Observable<Map<string, boolean>> {
    return this.affectedItems.asObservable();
  }

  onItemClick(option: string, type: string): void {
    const affectedItems = this.categoriesFormattedData.get(type).get(option);
    this.affectedItems.next(affectedItems);
  }

  addNewAnimal(): void {
    const animals = this.animals.getValue();
    const newAnimal: Animal = {
      type: 'dragon',
      color: 'green',
      length: '500',
      weight: '1000'
    };
    animals.push(newAnimal);
    this.animals.next(animals);
  }
}
