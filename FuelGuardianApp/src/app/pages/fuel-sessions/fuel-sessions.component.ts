import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { IFuelSession } from '../../models/IFuelSession';
import { FuelSessionsApiService } from '../../services/api/fuel-sessions-api.service';
import { HttpClientService } from '../../services/api/http-client-service';

interface IVehicleOption {
  id: number;
  vehicleType: string;
  plateNumber: string;
}

@Component({
  selector: 'app-fuel-sessions',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzCardModule,
    NzDatePickerModule,
    NzDividerModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzModalModule,
    NzTableModule,
    DatePipe,
    DecimalPipe,
  ],
  templateUrl: './fuel-sessions.component.html',
  styleUrl: './fuel-sessions.component.scss',
})
export class FuelSessionsComponent implements OnInit {
  sessions: IFuelSession[] = [];
  vehicles: IVehicleOption[] = [];
  isModalVisible = false;
  isSubmitting = false;
  sessionForm: FormGroup;

  constructor(
    private readonly fuelSessionsApi: FuelSessionsApiService,
    private readonly httpClient: HttpClientService,
  ) {
    this.sessionForm = new FormGroup({
      vehicleId: new FormControl<number | null>(null, [Validators.required]),
      dateFueled: new FormControl('', [Validators.required]),
      rate: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(0.01),
      ]),
      quantity: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(0.01),
      ]),
      odometer: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(0),
      ]),
    });
  }

  ngOnInit(): void {
    this.loadVehicles();
    this.refreshSessions();
  }

  refreshSessions(): void {
    this.fuelSessionsApi.getAll().subscribe({
      next: (data) => {
        this.sessions = data ?? [];
      },
      error: (error) => {
        console.error('Unable to load fuel sessions', error);
      },
    });
  }

  loadVehicles(): void {
    this.httpClient.get<IVehicleOption[]>('api/Vehicle').subscribe({
      next: (data) => {
        this.vehicles = data ?? [];
        if (!this.sessionForm.value.vehicleId && this.vehicles.length) {
          this.sessionForm.patchValue({ vehicleId: this.vehicles[0].id });
        }
      },
      error: (error) => {
        console.error('Unable to load vehicles', error);
      },
    });
  }

  openAddModal(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.sessionForm.reset({
      vehicleId: this.vehicles[0]?.id ?? null,
      dateFueled: '',
      rate: null,
      quantity: null,
      odometer: null,
    });
    this.isSubmitting = false;
  }

  submitSession(): void {
    if (this.sessionForm.invalid) {
      this.sessionForm.markAllAsTouched();
      return;
    }

    const rawValue = this.sessionForm.value;
    const payload: IFuelSession = {
      vehicleId: Number(rawValue.vehicleId),
      dateFueled: this.formatDate(rawValue.dateFueled),
      rate: Number(rawValue.rate),
      quantity: Number(rawValue.quantity),
      odometer: Number(rawValue.odometer),
    };

    this.isSubmitting = true;
    this.fuelSessionsApi.create(payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.closeModal();
        this.refreshSessions();
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Unable to save fuel session', error);
      },
    });
  }

  deleteSession(id?: number): void {
    if (!id) {
      return;
    }

    this.fuelSessionsApi.delete(id).subscribe({
      next: () => this.refreshSessions(),
      error: (error) => console.error('Unable to delete fuel session', error),
    });
  }

  getVehicleLabel(vehicleId: number): string {
    const vehicle = this.vehicles.find((item) => item.id === vehicleId);
    return vehicle
      ? `${vehicle.plateNumber} - ${vehicle.vehicleType}`
      : 'Unknown';
  }

  private formatDate(value: unknown): string {
    if (value instanceof Date) {
      return value.toISOString().slice(0, 10);
    }

    if (typeof value === 'string') {
      return value;
    }

    return '';
  }

  trackById(index: number, session: IFuelSession): number {
    return session.id ?? index;
  }
}
