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
      distanceTraveled: new FormControl(null, [Validators.required, Validators.min(0.1)]),
      fuelConsumptionRate: new FormControl('', [Validators.required, Validators.min(0.1)]),
    })
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
    this.addFuelUsageForm.controls.distanceTraveled.markAsTouched();
    this.addFuelUsageForm.controls.distanceTraveled.markAsDirty();

    console.log(this.addFuelUsageForm.controls.distanceTraveled);

    let _fuelUsage:FuelUsage= this.addFuelUsageForm.value;

    _fuelUsage.id = this.fuelUsages.length+1;

    if(this.addFuelUsageForm.valid){
      this.fuelUsages = [...this.fuelUsages, _fuelUsage];
      this.addFuelUsageForm.reset();
      this.closeModal();
    }
  }
}
