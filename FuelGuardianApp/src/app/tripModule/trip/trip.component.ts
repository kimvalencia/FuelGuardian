import { Component } from '@angular/core';
import { FuelUsage } from '../../models/FuelUsage';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.scss'
})
export class TripComponent {

  public isVisible:boolean = false;
  public isSaving:boolean = false;

  public addFuelUsageForm:any;

  constructor(){
    this.addFuelUsageForm = new FormGroup({
      tripDate: new FormControl('',[Validators.required]),
      distanceTraveled: new FormControl('', [Validators.required, Validators.min(0.1)]),
      fuelConsumptionRate: new FormControl('', [Validators.required, Validators.min(0.1)])
    })
  }

  public fuelUsages: FuelUsage[] = [
    {
      id: 1,
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
  ]

  computeFuelBurned(distance:number, consumptionRate:number):number {
    return distance / consumptionRate;
  }

  showAddTripModal():void {
    this.isVisible=true;
  }

  closeModal(){
    this.isVisible=false;
  }

  addTrip(){
    let _fuelUsage:FuelUsage= this.addFuelUsageForm.value;

    _fuelUsage.id = this.fuelUsages.length+1;
    console.log(this.fuelUsages);

    this.fuelUsages = [...this.fuelUsages, _fuelUsage];
    //console.log(this.addFuelUsageForm);
  }
}
