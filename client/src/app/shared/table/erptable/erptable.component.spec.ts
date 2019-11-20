import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ERPtableComponent } from './erptable.component';

describe('ERPtableComponent', () => {
  let component: ERPtableComponent;
  let fixture: ComponentFixture<ERPtableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ERPtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ERPtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
