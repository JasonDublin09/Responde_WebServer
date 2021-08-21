import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeEmailVerificationComponent } from './change-email-verification.component';

describe('ChangeEmailVerificationComponent', () => {
  let component: ChangeEmailVerificationComponent;
  let fixture: ComponentFixture<ChangeEmailVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeEmailVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeEmailVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
