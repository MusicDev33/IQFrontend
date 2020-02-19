import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractLabComponent } from './interactlab.component';

describe('InteractlabComponent', () => {
  let component: InteractLabComponent;
  let fixture: ComponentFixture<InteractLabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractLabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
