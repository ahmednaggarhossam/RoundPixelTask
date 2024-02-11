import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightRecommendedComponent } from './flight-recommended.component';

describe('FlightRecommendedComponent', () => {
  let component: FlightRecommendedComponent;
  let fixture: ComponentFixture<FlightRecommendedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlightRecommendedComponent]
    });
    fixture = TestBed.createComponent(FlightRecommendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
