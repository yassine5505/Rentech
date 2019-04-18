import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RibonComponent } from './ribon.component';

describe('RibonComponent', () => {
  let component: RibonComponent;
  let fixture: ComponentFixture<RibonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RibonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RibonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
