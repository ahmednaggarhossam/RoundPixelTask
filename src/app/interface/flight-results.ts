export interface flightResults {
    sequenceNum: number;
    pKey: string;
    isRefundable: boolean;
    itinTotalFare: ItinTotalFare;
    totalDuration: number;
    deptDate: string;
    arrivalDate: string;
    cabinClass: string;
    flightType: string;
    allJourney: AllJourney;
    baggageInformation: BaggageInformation[];
    passengerFareBreakDownDTOs: PassengerFareBreakDownDTO[];
}

export interface PassengerFareBreakDownDTO {
    key: string;
    pricingMethod: string;
    cancelPenaltyDTOs: CancelPenaltyDTO[];
    changePenaltyDTOs: CancelPenaltyDTO[];
    passengerQuantity: number;
    passengerType: string;
    passengersRef: string[];
    flightFaresDTOs: FlightFaresDTO[];
    taxes: Tax[];
}

export interface Tax {
    taxCode: string;
    amount: number;
    taxName?: any;
    taxCurrencyCode: string;
    content: string;
    countryCode?: any;
}

export interface FlightFaresDTO {
    fareAmount: number;
    fareType: string;
    currencyCode: string;
}

export interface CancelPenaltyDTO {
    price: number;
    curency: string;
    percentage: number;
}

export interface BaggageInformation {
    baggage: string;
    childBaggage?: any;
    infantBaggage?: any;
    airlineName: string;
    deptCity: string;
    landCity: string;
    flightNum: string;
}

export interface AllJourney {
    flights: Flight[];
}

export interface Flight {
    flightDTO: FlightDTO[];
    flightAirline: FlightAirline;
    elapsedTime: number;
    stopsNum: number;
}

export interface FlightDTO {
    departureOffset: number;
    arrivalOffset: number;
    isStopSegment: boolean;
    deptTime: string;
    landTime: string;
    departureDate: string;
    arrivalDate: string;
    flightAirline: FlightAirline;
    operatedAirline: OperatedAirline;
    durationPerLeg: number;
    departureTerminalAirport: DepartureTerminalAirport;
    arrivalTerminalAirport: DepartureTerminalAirport;
    transitTime: string;
    flightInfo: FlightInfo;
    segmentDetails: SegmentDetails;
    supplierRefID?: any;
}

export interface SegmentDetails {
    uniqueKey: string;
    baggage: string;
    childBaggage?: any;
    infantBaggage?: any;
}

export interface FlightInfo {
    flightNumber: string;
    equipmentNumber: string;
    mealCode: string;
    bookingCode: string;
    cabinClass: string;
}

export interface DepartureTerminalAirport {
    airportCode: string;
    airportName: string;
    cityName: string;
    cityCode: string;
    countryCode: string;
    countryName: string;
    regionName: string;
}

export interface OperatedAirline {
    airlineCode?: any;
    airlineName?: any;
    airlineLogo?: any;
    alternativeBusinessName?: any;
    passportDetailsRequired: boolean;
}

export interface FlightAirline {
    airlineCode: string;
    airlineName: string;
    airlineLogo: string;
    alternativeBusinessName: string;
    passportDetailsRequired: boolean;
    [key:string]: any;
}

export interface ItinTotalFare {
    amount: number;
    fareAmount: number;
    promoCode?: any;
    promoDiscount: number;
    currencyCode: string;
    totalTaxes: number;
}