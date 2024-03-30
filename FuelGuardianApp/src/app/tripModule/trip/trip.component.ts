import { Component, OnInit } from '@angular/core';
import { FuelUsage } from '../../models/FuelUsage';
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
  public fuelUsages:FuelUsage[]=[];

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
  }

  onSuccessAdd(result:boolean){
    if(result){
      this.closeModal();
      this.refreshData();
    }
  }
}
