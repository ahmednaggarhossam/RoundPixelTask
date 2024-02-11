import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightCheapestComponent } from './flight-cheapest.component';

describe('FlightCheapestComponent', () => {
  let component: FlightCheapestComponent;
  let fixture: ComponentFixture<FlightCheapestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlightCheapestComponent]
    });
    fixture = TestBed.createComponent(FlightCheapestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
