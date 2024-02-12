import { Component } from '@angular/core';
import { TravelService } from './../../service/travel.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AllJourney, flightResults } from './../../interface/flight-results';

@Component({
  selector: 'app-flight-results',
  templateUrl: './flight-results.component.html',
  styleUrls: ['./flight-results.component.css'],
})
export class FlightResultsComponent {
  flightResponseData: any = [];
  flightResults: any[] = [];
  keyword: string = '';
  filteredFlights: flightResults[] = [];
  filteredDataRange: flightResults[] = [];
  minRange = 1;
  maxRange = 20000;
  setNoStop = false;
  setStop = false;
  // Filter Form To filter the Flights Cards
  filterForm: FormGroup = new FormGroup({
    airlineName: new FormControl('', [
      Validators.pattern(/^[()a-zA-Z0-9_,. \-"*':!%+=\/&#@]*$/),
    ]),
    minValue: new FormControl(this.minRange),
    maxValue: new FormControl(this.maxRange),
    direct: new FormControl(0),
    stop: new FormControl(0),
  });

  submitForm(){
    console.log(this.filterForm)
  }
  // fliter the cards by all the filter at the same time
  filterByAll() {
    // get formControl value of direct checkbox
    let direct = this.filterForm.controls['direct'].value;
    // get formControl value of stop checkbox
    let stop = this.filterForm.controls['stop'].value;
    // get formControl value of airlineName input search
    let airlineName = this.filterForm.controls['airlineName'].value;
    // get formControl minimum value of range slider
    let min = this.filterForm.controls['minValue'].value;
    // get formControl maximum value of range slider
    let max = this.filterForm.controls['maxValue'].value;

    console.log('this.filterForm.value',this.filterForm.value);

    // Filter Cards based on airline name in the search input
    let tempFilteredFlights = this.flightResults.filter(
      (row: flightResults) => {
        return String(row.allJourney.flights[0].flightAirline[`airlineName`])
          .toLowerCase()
          .includes(String(airlineName).toLowerCase());
      }
    );

      // Filter Cards based on Total price
    tempFilteredFlights = tempFilteredFlights.filter((flight: flightResults) => {
      let price = Number(this.calcFlightPriceInEgyPound(flight.itinTotalFare.amount,flight.itinTotalFare.totalTaxes,flight.itinTotalFare.currencyCode).split('EGP ')[1]);
      return min <= price && price <= max;
    });

    // Filter Cards based on Stops = 0
    tempFilteredFlights = tempFilteredFlights.filter((flight: flightResults) => {
      let stops = flight.allJourney.flights[0].stopsNum;
      return direct ? stops == 0 : true;
    });

    // Filter Cards based on Stops = 1
    tempFilteredFlights = tempFilteredFlights.filter((flight: flightResults) => {
      let stops = flight.allJourney.flights[0].stopsNum;
      return stop ? stops == 1 : true;
    });
    this.filteredFlights = tempFilteredFlights;
  }

  getFlightStop() {
    this.filterForm.controls['direct'].valueChanges.subscribe((item) => {
      this.filterByAll();
    });
    this.filterForm.controls['stop'].valueChanges.subscribe((item) => {
      this.filterByAll();
    });
  }

  filterBasedOnSlider() {
    this.filterForm.controls['minValue'].valueChanges.subscribe((minValue) => {
      this.filterByAll();
    });

    this.filterForm.controls['maxValue'].valueChanges.subscribe((maxValue) => {
      this.filterByAll();
    });
  }

  filterFlight() {
    this.filterForm.controls['airlineName'].valueChanges.subscribe(
      (keyword) => {
        this.filterByAll();
      }
    );
  }

  constructor(private _TravelService: TravelService) {}

  ngOnInit(): void {
    this.getTravelData();
    this.filterBasedOnSlider();
    this.filterFlight();
    this.getFlightStop();
  }


  // get all flight cards in html Component

  getTravelData() {
    this._TravelService.getFlightResults().subscribe((response) => {
      this.flightResponseData = response;
      this.flightResults = [...this.flightResponseData.airItineraries];
      this.filteredFlights = [...this.flightResponseData.airItineraries];
      console.log(this.flightResponseData);
    });
  }
  // calcaulate Flight Duration of each flight
  calcFlightDuration(flight: any) {
    let arrivalTime = new Date(flight.arrivalDate).getTime();
    let DepartureTime = new Date(flight.departureDate).getTime();
    const timeDiff = arrivalTime - DepartureTime;
    const hrs = Math.floor(timeDiff / (1000 * 60 * 60));
    const mins = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    if (hrs < 10 && mins > 10) {
      return `0${hrs}h ${mins}m`;
    }
    if (hrs < 10 && mins < 10) {
      return `0${hrs}h 0${mins}m`;
    } else {
      return `${hrs}h ${mins}m`;
    }
  }
  // calculate Total flight price for each flight in egy Pound
  calcFlightPriceInEgyPound(
    fare: number,
    taxes: number,
    currencyCode: string
  ): string {
    let exchangeRate: any = {
      USD: 8.65,
      KWD: 15,
    };
    let totalAmount = (fare + taxes) * exchangeRate[currencyCode];
    return `EGP ${totalAmount.toFixed(2)}`;
  }
}
