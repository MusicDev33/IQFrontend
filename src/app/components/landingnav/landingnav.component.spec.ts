import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingNavComponent } from './landingnav.component';

describe('LandingnavComponent', () => {
  let component: LandingNavComponent;
  let fixture: ComponentFixture<LandingNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
