import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagocanceladoPage } from './pago-cancelado.page';

describe('PagoRealizadoPage', () => {
  let component: PagocanceladoPage;
  let fixture: ComponentFixture<PagocanceladoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PagocanceladoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
