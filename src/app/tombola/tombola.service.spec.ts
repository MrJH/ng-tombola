import { TestBed, inject } from '@angular/core/testing';

import { TombolaService } from './tombola.service';

describe('TombolaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TombolaService]
    });
  });

  it('should be created', inject([TombolaService], (service: TombolaService) => {
    expect(service).toBeTruthy();
  }));
});
