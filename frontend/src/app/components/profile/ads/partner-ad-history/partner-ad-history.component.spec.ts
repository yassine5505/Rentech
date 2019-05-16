import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerAdHistoryComponent } from './partner-ad-history.component';

describe('PartnerAdHistoryComponent', () => {
  let component: PartnerAdHistoryComponent;
  let fixture: ComponentFixture<PartnerAdHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerAdHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerAdHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
