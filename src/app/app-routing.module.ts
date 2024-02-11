import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightDetailsComponent } from './pages/flight-details/flight-details.component';
import { HotelsComponent } from './pages/hotels/hotels.component';
import { BusinessTravelComponent } from './pages/business-travel/business-travel.component';
import { FlightResultsComponent } from './pages/flight-results/flight-results.component';
import { FlightFastestComponent } from './pages/flight-fastest/flight-fastest.component';
import { FlightCheapestComponent } from './pages/flight-cheapest/flight-cheapest.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:'home',component:FlightResultsComponent, children:[
    {path:'recommended', component:FlightResultsComponent},
    {path:'fastest', component:FlightFastestComponent},
    {path:'cheapest', component:FlightCheapestComponent}
  ]},
  {path:'hotels',component:HotelsComponent},
  {path:'travels',component:BusinessTravelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
