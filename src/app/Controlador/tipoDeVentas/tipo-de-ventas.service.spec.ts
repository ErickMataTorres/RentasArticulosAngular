import { TestBed } from '@angular/core/testing';

import { TipoDeVentasService } from './tipo-de-ventas.service';

describe('TipoDeVentasService', () => {
  let service: TipoDeVentasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoDeVentasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
