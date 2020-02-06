import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmagentmasterComponent } from './cmagentmaster.component';

describe('CmagentmasterComponent', () => {
  let component: CmagentmasterComponent;
  let fixture: ComponentFixture<CmagentmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmagentmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmagentmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
