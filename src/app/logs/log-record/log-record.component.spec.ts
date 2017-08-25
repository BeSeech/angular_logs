import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogRecordComponent } from './log-record.component';

describe('LogRecordComponent', () => {
  let component: LogRecordComponent;
  let fixture: ComponentFixture<LogRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
