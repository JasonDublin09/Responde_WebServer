import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailverificationComponent } from './emailverification.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

describe('EmailverificationComponent', () => {
  let component: EmailverificationComponent;
  let fixture: ComponentFixture<EmailverificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailverificationComponent ],
      imports: [ReactiveFormsModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailverificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
