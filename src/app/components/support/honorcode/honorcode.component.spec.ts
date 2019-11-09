import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HonorcodeComponent } from './honorcode.component';

describe('HonorcodeComponent', () => {
  let component: HonorcodeComponent;
  let fixture: ComponentFixture<HonorcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HonorcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HonorcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
