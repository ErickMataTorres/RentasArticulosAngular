import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDeVentasComponent } from './tipo-de-ventas.component';

describe('TipoDeVentasComponent', () => {
  let component: TipoDeVentasComponent;
  let fixture: ComponentFixture<TipoDeVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoDeVentasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoDeVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
