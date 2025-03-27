import { TestBed } from '@angular/core/testing';

import { CategoriaService } from '../service/categoria.service';

describe('CategoriaService', () => {
  let service: CategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
