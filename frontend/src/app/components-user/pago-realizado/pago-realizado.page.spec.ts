import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoRealizadoPage } from './pago-realizado.page';

describe('PagoRealizadoPage', () => {
  let component: PagoRealizadoPage;
  let fixture: ComponentFixture<PagoRealizadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoRealizadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
