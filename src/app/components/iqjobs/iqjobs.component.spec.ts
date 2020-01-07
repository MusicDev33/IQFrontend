import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IqjobsComponent } from './iqjobs.component';

describe('IqjobsComponent', () => {
  let component: IqjobsComponent;
  let fixture: ComponentFixture<IqjobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IqjobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IqjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
