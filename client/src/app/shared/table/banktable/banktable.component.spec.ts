import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanktableComponent } from './banktable.component';

describe('BanktableComponent', () => {
  let component: BanktableComponent;
  let fixture: ComponentFixture<BanktableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanktableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanktableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
