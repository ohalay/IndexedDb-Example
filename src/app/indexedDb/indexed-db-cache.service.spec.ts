import { TestBed, inject } from '@angular/core/testing';

import { IndexedDbCache } from './indexed-db-cache.service';

describe('IndexedDbCache', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndexedDbCache]
    });
  });

  it('should be created', inject([IndexedDbCache], (service: IndexedDbCache) => {
    expect(service).toBeTruthy();
  }));
});
