import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolloverpopupComponent } from './rolloverpopup.component';

describe('RolloverpopupComponent', () => {
  let component: RolloverpopupComponent;
  let fixture: ComponentFixture<RolloverpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolloverpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolloverpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
