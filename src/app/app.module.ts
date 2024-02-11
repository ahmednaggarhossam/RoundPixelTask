import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlightResultsComponent } from './pages/flight-results/flight-results.component';
import { HttpClientModule } from "@angular/common/http";
import { FooterComponent } from './component/footer/footer.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FlightDetailsComponent } from './pages/flight-details/flight-details.component';
import { TimePipePipe } from './pipes/time-pipe.pipe';
import { HotelsComponent } from './pages/hotels/hotels.component';
import { BusinessTravelComponent } from './pages/business-travel/business-travel.component';
import { FlightRecommendedComponent } from './pages/flight-recommended/flight-recommended.component';
import { FlightCheapestComponent } from './pages/flight-cheapest/flight-cheapest.component';
import { FlightFastestComponent } from './pages/flight-fastest/flight-fastest.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    FlightResultsComponent,
    FooterComponent,
    NavbarComponent,
    FlightDetailsComponent,
    TimePipePipe,
    HotelsComponent,
    BusinessTravelComponent,
    FlightRecommendedComponent,
    FlightCheapestComponent,
    FlightFastestComponent,
    FilterPipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
