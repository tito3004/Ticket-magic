import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerificadoPage } from './verificado.page';

describe('VerificadoPage', () => {
  let component: VerificadoPage;
  let fixture: ComponentFixture<VerificadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
