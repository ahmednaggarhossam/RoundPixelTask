import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightFastestComponent } from './flight-fastest.component';

describe('FlightFastestComponent', () => {
  let component: FlightFastestComponent;
  let fixture: ComponentFixture<FlightFastestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlightFastestComponent]
    });
    fixture = TestBed.createComponent(FlightFastestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
