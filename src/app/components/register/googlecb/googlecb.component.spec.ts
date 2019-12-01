import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GooglecbComponent } from './googlecb.component';

describe('GooglecbComponent', () => {
  let component: GooglecbComponent;
  let fixture: ComponentFixture<GooglecbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GooglecbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GooglecbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
