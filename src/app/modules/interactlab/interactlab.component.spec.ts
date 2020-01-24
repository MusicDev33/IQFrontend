import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractlabComponent } from './interactlab.component';

describe('InteractlabComponent', () => {
  let component: InteractlabComponent;
  let fixture: ComponentFixture<InteractlabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractlabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractlabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
