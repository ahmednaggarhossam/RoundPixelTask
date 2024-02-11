import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { flightResults } from '../interface/flight-results';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  constructor(private _HttpClient:HttpClient) { }

  getFlightResults():Observable<flightResults>{
    return this._HttpClient.get<flightResults>(`../../assets/response.json`);
  }
}
