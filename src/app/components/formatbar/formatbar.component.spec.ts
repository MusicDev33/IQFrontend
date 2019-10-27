import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatbarComponent } from './formatbar.component';

describe('FormatbarComponent', () => {
  let component: FormatbarComponent;
  let fixture: ComponentFixture<FormatbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormatbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
