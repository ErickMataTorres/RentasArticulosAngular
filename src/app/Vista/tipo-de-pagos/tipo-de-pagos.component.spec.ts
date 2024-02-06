import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDePagosComponent } from './tipo-de-pagos.component';

describe('TipoDePagosComponent', () => {
  let component: TipoDePagosComponent;
  let fixture: ComponentFixture<TipoDePagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoDePagosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoDePagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
