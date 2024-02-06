import { TestBed } from '@angular/core/testing';

import { TipoDePagosService } from './tipo-de-pagos.service';

describe('TipoDePagosService', () => {
  let service: TipoDePagosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoDePagosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
