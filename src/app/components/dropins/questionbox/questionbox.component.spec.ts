import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionboxComponent } from './questionbox.component';

describe('QuestionboxComponent', () => {
  let component: QuestionboxComponent;
  let fixture: ComponentFixture<QuestionboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
