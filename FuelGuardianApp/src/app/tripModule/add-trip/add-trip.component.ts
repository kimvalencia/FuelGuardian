import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { TripService } from '../../services/trip.service';
import { FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ITrip } from '../../models/ITrip';
import { FuelUsagesApiService } from '../../services/api/FuelUsages/fuel-usages-api-service';
import { NzFormDirective, NzFormItemComponent, NzFormLabelComponent, NzFormControlComponent } from 'ng-zorro-antd/form';
import { NzRowDirective, NzColDirective } from 'ng-zorro-antd/grid';
import { NzSpaceCompactItemDirective } from 'ng-zorro-antd/space';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzWaveDirective } from 'ng-zorro-antd/core/wave';
import { ɵNzTransitionPatchDirective } from 'ng-zorro-antd/core/transition-patch';

@Component({
    selector: 'app-add-trip',
    templateUrl: './add-trip.component.html',
    styleUrl: './add-trip.component.scss',
    imports: [FormsModule, NzFormDirective, ReactiveFormsModule, NzRowDirective, NzFormItemComponent, NzColDirective, NzFormLabelComponent, NzFormControlComponent, NzSpaceCompactItemDirective, NzDatePickerComponent, NzInputDirective, NzButtonComponent, NzWaveDirective, ɵNzTransitionPatchDirective]
})
export class AddTripComponent implements OnInit {

  private http = inject(FuelUsagesApiService);

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

      _trip.vehicleId=4;

      console.log(_trip);

      this.http.create(_trip).subscribe({
        next: (data) => {
          this.isSaving=false;
        },
        error: (error) => {
          console.error('Error creating trip', error);
          this.isSaving=false;
        },
    });

      //this.tripService.addTrip(_trip);
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
