import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibMobileComponent } from './lib-mobile.component';

describe('LibMobileComponent', () => {
  let component: LibMobileComponent;
  let fixture: ComponentFixture<LibMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
