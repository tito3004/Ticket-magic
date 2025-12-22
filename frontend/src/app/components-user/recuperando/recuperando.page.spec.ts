import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperandoPage } from './recuperando.page';

describe('RecuperandoPage', () => {
  let component: RecuperandoPage;
  let fixture: ComponentFixture<RecuperandoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperandoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
