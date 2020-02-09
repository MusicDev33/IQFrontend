import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdslandingComponent } from './adslanding.component';

describe('AdslandingComponent', () => {
  let component: AdslandingComponent;
  let fixture: ComponentFixture<AdslandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdslandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdslandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
