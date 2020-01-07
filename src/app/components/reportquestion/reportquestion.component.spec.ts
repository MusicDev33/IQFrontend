import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportQuestionComponent } from './reportquestion.component';

describe('ReportQuestionComponent', () => {
  let component: ReportquestionComponent;
  let fixture: ComponentFixture<ReportQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
