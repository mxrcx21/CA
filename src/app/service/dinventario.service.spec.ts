import { TestBed } from '@angular/core/testing';

import { DinventarioService } from './dinventario.service';

describe('DinventarioService', () => {
  let service: DinventarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DinventarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
