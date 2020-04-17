import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseslotComponent } from './chooseslot.component';

describe('ChooseslotComponent', () => {
  let component: ChooseslotComponent;
  let fixture: ComponentFixture<ChooseslotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseslotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseslotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
