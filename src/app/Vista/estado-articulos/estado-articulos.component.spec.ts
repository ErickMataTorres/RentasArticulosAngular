import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoArticulosComponent } from './estado-articulos.component';

describe('EstadoArticulosComponent', () => {
  let component: EstadoArticulosComponent;
  let fixture: ComponentFixture<EstadoArticulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadoArticulosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstadoArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
