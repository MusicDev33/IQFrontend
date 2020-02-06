import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvintroComponent } from './advintro.component';

describe('AdvintroComponent', () => {
  let component: AdvintroComponent;
  let fixture: ComponentFixture<AdvintroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvintroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvintroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
