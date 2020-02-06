import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestioncardComponent } from './questioncard.component';

describe('QuestioncardComponent', () => {
  let component: QuestioncardComponent;
  let fixture: ComponentFixture<QuestioncardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestioncardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestioncardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
