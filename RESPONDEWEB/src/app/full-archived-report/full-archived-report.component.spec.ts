import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullArchivedReportComponent } from './full-archived-report.component';

describe('FullArchivedReportComponent', () => {
  let component: FullArchivedReportComponent;
  let fixture: ComponentFixture<FullArchivedReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullArchivedReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullArchivedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
