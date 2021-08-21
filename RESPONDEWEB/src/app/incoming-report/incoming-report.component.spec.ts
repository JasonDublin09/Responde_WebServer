import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingReportComponent } from './incoming-report.component';

describe('IncomingReportComponent', () => {
  let component: IncomingReportComponent;
  let fixture: ComponentFixture<IncomingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomingReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
