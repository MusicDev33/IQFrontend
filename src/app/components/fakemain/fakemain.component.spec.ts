import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FakemainComponent } from './fakemain.component';

describe('FakemainComponent', () => {
  let component: FakemainComponent;
  let fixture: ComponentFixture<FakemainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FakemainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakemainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
