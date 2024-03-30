import { Injectable } from '@angular/core';
import { FuelUsage } from '../models/FuelUsage';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor() { }

  private _trips:BehaviorSubject<FuelUsage[]>= new BehaviorSubject<FuelUsage[]>([]);
  public trips$:Observable<FuelUsage[]> = this._trips.asObservable();

  public trips:Array<FuelUsage>=[
    {
      id:1,
      tripDate: new Date("02/11/2024"),
      distanceTraveled: 89.1,
      fuelConsumptionRate: 12.1
    },
    {
      id: 2,
      tripDate: new Date("02/25/2024"),
      distanceTraveled: 40.6,
      fuelConsumptionRate: 11.1
    },
    {
      id: 3,
      tripDate: new Date("02/25/2024"),
      distanceTraveled: 49.8,
      fuelConsumptionRate: 12.2
    }
  ];

  public addTrip(fuelUsage:FuelUsage){
    fuelUsage.id = this.trips.length+1;
    this.trips = [...this.trips, fuelUsage];
  } 
}
