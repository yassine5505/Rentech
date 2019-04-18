import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardItemDetailsComponent } from './card-item-details.component';

describe('CardItemDetailsComponent', () => {
  let component: CardItemDetailsComponent;
  let fixture: ComponentFixture<CardItemDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardItemDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
