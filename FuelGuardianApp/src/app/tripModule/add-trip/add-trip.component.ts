import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TripService } from '../../services/trip.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { FuelUsage } from '../../models/FuelUsage';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.scss'
})
export class AddTripComponent implements OnInit {

  public addFuelUsageForm:any; 
  public isSaving:boolean = false;
  @Output() onSuccess = new EventEmitter<boolean>();

  constructor(private tripService:TripService){}


  ngOnInit(): void {
    this.addFuelUsageForm= 
          new FormGroup({
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

  addTrip(){
    this.isSaving=true;
    if(this.addFuelUsageForm.valid){
      let _fuelUsage:FuelUsage= this.addFuelUsageForm.value;
      this.tripService.addTrip(_fuelUsage);
      this.addFuelUsageForm.reset();

      this.onSuccess.emit(true);
    }
  }
}
