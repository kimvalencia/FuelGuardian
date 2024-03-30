import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TripService } from '../../services/trip.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ITrip } from '../../models/ITrip';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.scss'
})
export class AddTripComponent implements OnInit {

  public addTripForm:any; 
  public isSaving:boolean = false;
  @Output() onSuccess = new EventEmitter<boolean>();
  @Input() selectedTrip:ITrip | undefined;

  constructor(private tripService:TripService){}


  ngOnInit(): void {
    this.addTripForm= 
          new FormGroup({
            tripDate: new FormControl( 
              this.selectedTrip?.tripDate ?? ''
              ,[Validators.required]),
            distanceTraveled: new FormControl(
              this.selectedTrip?.distanceTraveled
              , [Validators.required, Validators.min(0.1)]),
            fuelConsumptionRate: new FormControl(
              this.selectedTrip?.fuelConsumptionRate
              , [Validators.required, Validators.min(0.1)]),
          })
  }

  get tripDate():any {
    return this.addTripForm.get('tripDate');
  }

  get distanceTraveled():any {
    return this.addTripForm.get('distanceTraveled');
  }

  get fuelConsumptionRate():any{
    return this.addTripForm.get('fuelConsumptionRate');
  }

  handleSave(){
    if(this.selectedTrip != undefined){
      this.updateTrip();
    }
    else{
      this.addTrip();
    }
  }

  addTrip(){
    this.isSaving=true;
    if(this.addTripForm.valid){
      let _trip:ITrip= this.addTripForm.value;
      this.tripService.addTrip(_trip);
      this.addTripForm.reset();

      this.onSuccess.emit(true);
    }
  }

  updateTrip(){
      let _trip:ITrip= this.addTripForm.value;
      _trip.id= this.selectedTrip?.id;
      this.tripService.updateTrip(_trip);
      this.onSuccess.emit(true);
  }
}
