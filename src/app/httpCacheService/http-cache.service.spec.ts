import { TestBed, inject } from '@angular/core/testing';

import { HttpCache } from './http-cache.service';

describe('HttpCacheServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpCache]
    });
  });

  it('should be created', inject([HttpCache], (service: HttpCache) => {
    expect(service).toBeTruthy();
  }));
});
