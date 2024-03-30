import { Injectable } from '@angular/core';
import { ITrip } from '../models/ITrip';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor() { }

//  private _trips:BehaviorSubject<ITrip[]>= new BehaviorSubject<ITrip[]>([]);
//  public trips$:Observable<ITrip[]> = this._trips.asObservable();

  public trips:Array<ITrip>=[
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

  public addTrip(trip:ITrip){
    trip.id = this.trips.length+1;
    this.trips = [...this.trips, trip];
  } 

  public updateTrip(trip:ITrip){
    let index = this.trips.findIndex((w)=>w.id == trip.id)

    this.trips[index] = trip;
  }
}
