import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullIncomingReportComponent } from './full-incoming-report.component';

describe('FullIncomingReportComponent', () => {
  let component: FullIncomingReportComponent;
  let fixture: ComponentFixture<FullIncomingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullIncomingReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullIncomingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
