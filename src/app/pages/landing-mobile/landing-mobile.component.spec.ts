import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingMobileComponent } from './landing-mobile.component';

describe('LandingMobileComponent', () => {
  let component: LandingMobileComponent;
  let fixture: ComponentFixture<LandingMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
