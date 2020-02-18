import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IQJobsComponent } from './iqjobs.component';

describe('IqjobsComponent', () => {
  let component: IQJobsComponent;
  let fixture: ComponentFixture<IQJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IQJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IQJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
