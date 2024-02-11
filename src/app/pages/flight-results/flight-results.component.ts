import { Component } from '@angular/core';
import { TravelService } from './../../service/travel.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AllJourney, flightResults } from './../../interface/flight-results';
interface Flight{
  departureTime: string;
  arrivalTime: string;
}
interface card{
  name:string,
  price:number
}
@Component({
  selector: 'app-flight-results',
  templateUrl: './flight-results.component.html',
  styleUrls: ['./flight-results.component.css']
})
export class FlightResultsComponent {
  flightResponseData: any= [];
  flightResults: any[] = [];
  keyword: string = '';
  filteredFlights: flightResults[] = [];
  filteredDataRange: flightResults[] = [];
  minRange = 0;
  maxRange = 500;
  flights: Flight[] = [];

  filterForm:FormGroup = new FormGroup ({
    airlineName: new FormControl(null, [Validators.pattern(/^[()a-zA-Z0-9_,. \-"*':!%+=\/&#@]*$/)]),
    minValue: new FormControl(0),
    maxValue: new FormControl(500),
  });

  filterBasedOnSlider(){
    this.filterForm.controls['minValue'].valueChanges.subscribe((result) => {
      this.filteredFlights = this.flightResults.filter((item) => this.filterFlightData(item,'minValue'))
    })
  }

  filterFlight(){
    this.filterForm.controls['airlineName'].valueChanges.subscribe((result) =>{
      this.filteredFlights = this.flightResults.filter((item) => this.filterFlightData(item,'airlineName'))
      console.log("FilterResult",this.flightResults);
      console.log(result)
    })
  }
  filterFlightData(flight:flightResults, controlName:string){
    let searchName = this.filterForm.get(controlName)?.value;
    return (flight.allJourney.flights[0].flightAirline[`${controlName}`].toLowerCase()).includes(String(searchName).toLowerCase());
  }
  minRangeValue(flight:flightResults){
    
  }
  // onRangeChange(eventInfo:any){
  //   this.minRange = event.value[0];
  //   this.maxRange = event.value[1];
  //   this.filteredDataRange = this.flightResults.filter((item) => item.value >= this.minRange && item.value <= this.maxRange)
  // }

  get StartValue(){
    return 
  }
  constructor(private _TravelService:TravelService){ }

  ngOnInit():void{
    this.getTravelData();
  }
  getTravelData(){
    let cardsData: card[][] =[];
    this._TravelService.getFlightResults().subscribe((response) =>{
      this.flightResponseData = response;
      this.flightResults = [...this.flightResponseData.airItineraries];
      this.filteredFlights = [...this.flightResponseData.airItineraries]
      console.log(this.flightResponseData);
    })
  }
  calcFlightDuration(flight:any){
    let arrivalTime = new Date(flight.arrivalDate).getTime();
    let DepartureTime = new Date(flight.departureDate).getTime();
    const timeDiff = arrivalTime - DepartureTime;
    const hrs = Math.floor(timeDiff / (1000 * 60 * 60));
    const mins =Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    if(hrs < 10 && mins > 10){
      return `0${hrs}h ${mins}m`;
    }
    if(hrs < 10 && mins < 10){
      return `0${hrs}h 0${mins}m`;
    }
    else{
      return `${hrs}h ${mins}m`;
    }
    
  }
  calcFlightPriceInEgyPound(fare:number, taxes:number, currencyCode:string):string{
    let exchangeRate:any ={
      USD: 8.65,
      KWD: 15
    };
    let totalAmount = (fare + taxes) * exchangeRate[currencyCode];
    return `EGP ${totalAmount.toFixed(2)}`;
  }
}
// cardsData.forEach(flightResponseData => {
//   let priceGroup = cardsData.find(group => group[0].price === (this.flightResponseData.flight.itinTotalFare.amount + this.flightResponseData.itinTotalFare.totalTaxes));
//   if(priceGroup){
//     priceGroup.push(this.flightResponseData);
//   }
//   else{
//     cardsData.push([this.flightResponseData]);
//   }
// })
