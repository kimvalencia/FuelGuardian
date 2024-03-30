import { Component, OnInit } from '@angular/core';
import { ITrip } from '../../models/ITrip';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TripService } from '../../services/trip.service';
import { Observable, delay } from 'rxjs';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.scss'
})
export class TripComponent implements OnInit {

  public isVisible:boolean = false;
  public fuelUsages:ITrip[]=[];
  public selectedTrip:ITrip | undefined;

  constructor(private tripService:TripService){}

  ngOnInit(): void {
    this.refreshData();
  }

  private refreshData(){
    this.fuelUsages= [...this.tripService.trips];
  }

  computeFuelBurned(distance:number, consumptionRate:number):number {
    return distance / consumptionRate;
  }

  showAddTripModal():void {
    this.isVisible=true;
  }

  closeModal(){
    this.isVisible=false;
    this.selectedTrip =undefined;
  }

  onSuccessAdd(result:boolean){
    if(result){
      this.closeModal();
      this.refreshData();
    }
  }

  editTrip(trip:ITrip){
    console.log(trip);
    this.selectedTrip=trip;
    this.showAddTripModal();
  }
}
