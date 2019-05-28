import { TestBed } from '@angular/core/testing';

import { SakilaService } from './sakila.service';

describe('SakilaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SakilaService = TestBed.get(SakilaService);
    expect(service).toBeTruthy();
  });
});
