import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsLandingComponent } from './adslanding.component';

describe('AdslandingComponent', () => {
  let component: AdsLandingComponent;
  let fixture: ComponentFixture<AdsLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
