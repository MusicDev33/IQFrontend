import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestioneditComponent } from './questionedit.component';

describe('QuestioneditComponent', () => {
  let component: QuestioneditComponent;
  let fixture: ComponentFixture<QuestioneditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestioneditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestioneditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
