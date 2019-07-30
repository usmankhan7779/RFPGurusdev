import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrfpsComponent } from './addrfps.component';

describe('AddrfpsComponent', () => {
  let component: AddrfpsComponent;
  let fixture: ComponentFixture<AddrfpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrfpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrfpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
