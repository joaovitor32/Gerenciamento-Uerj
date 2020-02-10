import { TestBed } from '@angular/core/testing';

import { ProvasService } from './provas.service';

describe('ProvasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProvasService = TestBed.get(ProvasService);
    expect(service).toBeTruthy();
  });
});
