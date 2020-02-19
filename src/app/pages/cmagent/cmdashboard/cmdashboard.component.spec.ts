import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CMDashboardComponent } from './cmdashboard.component';

describe('CmdashboardComponent', () => {
  let component: CMDashboardComponent;
  let fixture: ComponentFixture<CMDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CMDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CMDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
