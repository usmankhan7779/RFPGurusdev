import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencysubcripationComponent } from './agencysubcripation.component';

describe('AgencysubcripationComponent', () => {
  let component: AgencysubcripationComponent;
  let fixture: ComponentFixture<AgencysubcripationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencysubcripationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencysubcripationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
