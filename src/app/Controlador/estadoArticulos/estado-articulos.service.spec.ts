import { TestBed } from '@angular/core/testing';

import { EstadoArticulosService } from './estado-articulos.service';

describe('EstadoArticulosService', () => {
  let service: EstadoArticulosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoArticulosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
