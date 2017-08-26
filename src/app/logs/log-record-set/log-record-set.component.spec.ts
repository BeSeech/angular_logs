import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogRecordSetComponent } from './log-record-set.component';

describe('LogRecordSetComponent', () => {
  let component: LogRecordSetComponent;
  let fixture: ComponentFixture<LogRecordSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogRecordSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogRecordSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
