import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TravelService } from './../../service/travel.service';
import { flightResults } from 'src/app/interface/flight-results';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent {
  id:string = '';
  wholeFlights: any[] = [];
  filteredData?: flightResults;
  constructor (private _TravelService:TravelService, private _ActivatedRoute:ActivatedRoute) { 
    this.id = _ActivatedRoute.snapshot.params['id'];
  }
  ngOnInit():void{
    this.getFlights();
  }
  getFlights(){
    this._TravelService.getFlightResults().subscribe((results:flightResults) => {
      console.log(results);
      console.log("wholeFlights", this.wholeFlights)
    })
  }
  filterBasedOnID(){
    this.filteredData = this.wholeFlights.find((row:flightResults) => {
      
    })
  }
  
}
// this.filteredData = this.wholeFlights.find((row:flightResults) => {
//   console.log(row)
//   let seqNumber = row.allJourney.flights;
//   console.log("Return",seqNumber);
// })
