import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { TripService } from '../../services/trip.service';
import {
  FormGroup,
  Validators,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ITrip } from '../../models/ITrip';
import { FuelUsagesApiService } from '../../services/api/FuelUsages/fuel-usages-api-service';
import {
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
  NzFormControlComponent,
} from 'ng-zorro-antd/form';
import { NzRowDirective, NzColDirective } from 'ng-zorro-antd/grid';
import { NzSpaceCompactItemDirective } from 'ng-zorro-antd/space';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzWaveDirective } from 'ng-zorro-antd/core/wave';
import { ɵNzTransitionPatchDirective } from 'ng-zorro-antd/core/transition-patch';
import { HttpClientService } from '../../services/api/http-client-service';

interface IVehicle {
  id: number;
  vehicleType: string;
  plateNumber: string;
}

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.scss',
  imports: [
    FormsModule,
    NzFormDirective,
    ReactiveFormsModule,
    NzRowDirective,
    NzFormItemComponent,
    NzColDirective,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzSpaceCompactItemDirective,
    NzDatePickerComponent,
    NzInputDirective,
    NzButtonComponent,
    NzWaveDirective,
    ɵNzTransitionPatchDirective,
  ],
})
export class AddTripComponent implements OnInit, OnChanges {
  private http = inject(FuelUsagesApiService);
  private httpClient = inject(HttpClientService);

  public addTripForm!: FormGroup;
  public isSaving: boolean = false;
  public vehicles: IVehicle[] = [];
  @Output() onSuccess = new EventEmitter<boolean>();
  @Input() selectedTrip: ITrip | undefined;

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadVehicles();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedTrip']) {
      this.buildForm();
      this.loadVehicles();
    }
  }

  private buildForm(): void {
    this.addTripForm = new FormGroup({
      tripDate: new FormControl(this.selectedTrip?.tripDate ?? '', [
        Validators.required,
      ]),
      distanceTraveled: new FormControl(
        this.selectedTrip?.distanceTraveled ?? null,
        [Validators.required, Validators.min(0.1)],
      ),
      fuelConsumptionRate: new FormControl(
        this.selectedTrip?.fuelConsumptionRate ?? null,
        [Validators.required, Validators.min(0.1)],
      ),
      vehicleId: new FormControl(this.selectedTrip?.vehicleId ?? null, [
        Validators.required,
      ]),
    });
  }

  private loadVehicles(): void {
    this.httpClient.get<IVehicle[]>('api/Vehicle').subscribe({
      next: (data) => {
        this.vehicles = data ?? [];
        if (this.vehicles.length > 0) {
          const defaultVehicleId =
            this.selectedTrip?.vehicleId ??
            this.vehicleId?.value ??
            this.vehicles[0].id;
          this.vehicleId?.setValue(defaultVehicleId, { emitEvent: false });
        }
      },
      error: (error) => {
        console.error('Error loading vehicles', error);
      },
    });
  }

  get tripDate(): any {
    return this.addTripForm.get('tripDate');
  }

  get distanceTraveled(): any {
    return this.addTripForm.get('distanceTraveled');
  }

  get fuelConsumptionRate(): any {
    return this.addTripForm.get('fuelConsumptionRate');
  }

  get vehicleId(): any {
    return this.addTripForm.get('vehicleId');
  }

  handleSave() {
    if (this.selectedTrip != undefined) {
      this.updateTrip();
    } else {
      this.addTrip();
    }
  }

  addTrip() {
    this.isSaving = true;
    if (this.addTripForm.valid) {
      const formValue = this.addTripForm.value;
      const _trip: ITrip = {
        ...formValue,
        vehicleId: Number(formValue.vehicleId),
      };

      console.log(_trip);

      this.http.create(_trip).subscribe({
        next: () => {
          this.isSaving = false;
        },
        error: (error) => {
          console.error('Error creating trip', error);
          this.isSaving = false;
        },
      });

      this.buildForm();
      this.loadVehicles();
      this.onSuccess.emit(true);
    } else {
      this.isSaving = false;
    }
  }

  updateTrip() {
    const formValue = this.addTripForm.value;
    const _trip: ITrip = {
      ...formValue,
      id: this.selectedTrip?.id,
      vehicleId: Number(formValue?.vehicleId),
    };
    this.tripService.updateTrip(_trip);
    this.onSuccess.emit(true);
  }
}
