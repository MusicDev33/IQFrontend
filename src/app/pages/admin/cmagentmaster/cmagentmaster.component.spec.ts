import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CMAgentMasterComponent } from './cmagentmaster.component';

describe('CmagentmasterComponent', () => {
  let component: CMAgentMasterComponent;
  let fixture: ComponentFixture<CMAgentMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CMAgentMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CMAgentMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
