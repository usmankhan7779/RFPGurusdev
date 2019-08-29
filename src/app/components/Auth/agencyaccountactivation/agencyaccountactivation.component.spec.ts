import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyaccountactivationComponent } from './agencyaccountactivation.component';

describe('AgencyaccountactivationComponent', () => {
  let component: AgencyaccountactivationComponent;
  let fixture: ComponentFixture<AgencyaccountactivationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyaccountactivationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyaccountactivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
