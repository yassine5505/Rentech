import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsPageComponent } from './ads-page.component';

describe('AdsPageComponent', () => {
  let component: AdsPageComponent;
  let fixture: ComponentFixture<AdsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
