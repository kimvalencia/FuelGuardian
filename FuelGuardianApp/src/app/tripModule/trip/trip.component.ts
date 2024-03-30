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
  public isSaving:boolean = false;
  public fuelUsages:FuelUsage[]=[];

  public addFuelUsageForm:any;

  constructor(private tripService:TripService){
    this.addFuelUsageForm = new FormGroup({
      tripDate: new FormControl('',[Validators.required]),
      distanceTraveled: new FormControl(null, [Validators.required, Validators.min(0.1)]),
      fuelConsumptionRate: new FormControl('', [Validators.required, Validators.min(0.1)]),
    })
    
  }

  ngOnInit(): void {
    this.refreshData();
  }

  get tripDate():any {
    return this.addFuelUsageForm.get('tripDate');
  }

  get distanceTraveled():any {
    return this.addFuelUsageForm.get('distanceTraveled');
  }

  get fuelConsumptionRate():any{
    return this.addFuelUsageForm.get('fuelConsumptionRate');
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
    this.isSaving=false;
  }

  async addTrip(){
    this.isSaving=true;
    setTimeout(() => {
      if(this.addFuelUsageForm.valid){
      let _fuelUsage:FuelUsage= this.addFuelUsageForm.value;
      this.tripService.addTrip(_fuelUsage);
      this.addFuelUsageForm.reset();
      this.refreshData();
      this.closeModal();
    }
    }, 2000);
   

    
  }
}
