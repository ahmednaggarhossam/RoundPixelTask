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
  minRange = 1;
  maxRange = 20000;
  setNoStop =false;
  setStop =false;
  filterForm:FormGroup = new FormGroup ({
    airlineName: new FormControl(null, [Validators.pattern(/^[()a-zA-Z0-9_,. \-"*':!%+=\/&#@]*$/)]),
    minValue: new FormControl(this.minRange),
    maxValue: new FormControl(this.maxRange),
    direct: new FormControl(null),
    stop: new FormControl(null)
  });

  filterDataBasedOnCheckbox(){

  }
  getFlightStop(){
    this.filterForm.controls['direct'].valueChanges.subscribe((item) =>{
      console.log(item);
      this.filteredFlights = this.flightResults.filter((flight:flightResults) => {
        let stops =  flight.allJourney.flights[0].stopsNum;
        return item? stops == 0:true;
      })
    })
    this.filterForm.controls['stop'].valueChanges.subscribe((item) =>{
      console.log(item);
      this.filteredFlights = this.flightResults.filter((flight:flightResults) => {
        let stops =  flight.allJourney.flights[0].stopsNum;
        return item? stops == 1:true;
      })
    })
  }

  filterBasedOnSlider(){
    this.filterForm.controls['minValue'].valueChanges.subscribe((minValue) => {
      this.filteredFlights = this.getFlightsInRange();
    });

    this.filterForm.controls['maxValue'].valueChanges.subscribe((maxValue) => {
      this.filteredFlights = this.getFlightsInRange();
    });
  }

  filterFlight(){
    this.filterForm.controls['airlineName'].valueChanges.subscribe((keyword) =>{
      this.filteredFlights = this.filterFlightData(keyword, 'airlineName')
      console.log("FilterResult",this.filteredFlights);
      console.log(keyword)
    })
  }


  filterFlightData(keyword : string, controlName:string){
    return this.flightResults.filter((row:flightResults) => {
      return String(row.allJourney.flights[0].flightAirline[`${controlName}`]).toLowerCase().includes(String(keyword).toLowerCase())
    } )
  }

  getFlightsInRange(){
    let min = this.filterForm.controls['minValue'].value;
    let max = this.filterForm.controls['maxValue'].value;
    return this.flightResults.filter((flight:flightResults) => {
      let price = Number(this.calcFlightPriceInEgyPound(flight.itinTotalFare.amount,flight.itinTotalFare.totalTaxes,flight.itinTotalFare.currencyCode).split('EGP ')[1]);
      return min <= price && price <= max
    } )
  }

  filterALl(){
    
  }
  constructor(private _TravelService:TravelService){ }

  ngOnInit():void{
    this.getTravelData();
    this.filterBasedOnSlider();
    this.filterFlight();
    this.getFlightStop();
  }
  getTravelData(){
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
