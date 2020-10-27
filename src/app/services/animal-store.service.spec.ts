import { TestBed } from '@angular/core/testing';

import { AnimalStoreService } from './animal-store.service';

describe('AnimalStoreService', () => {
  let service: AnimalStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimalStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
