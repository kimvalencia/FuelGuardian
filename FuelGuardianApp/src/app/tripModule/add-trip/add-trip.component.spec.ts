import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FuelUsagesApiService } from '../../services/api/FuelUsages/fuel-usages-api-service';
import { HttpClientService } from '../../services/api/http-client-service';
import { TripService } from '../../services/trip.service';

import { AddTripComponent } from './add-trip.component';

describe('AddTripComponent', () => {
  let component: AddTripComponent;
  let fixture: ComponentFixture<AddTripComponent>;
  let messageService: jasmine.SpyObj<NzMessageService>;
  let fuelUsageApiService: jasmine.SpyObj<FuelUsagesApiService>;
  let httpClientService: jasmine.SpyObj<HttpClientService>;

  beforeEach(async () => {
    messageService = jasmine.createSpyObj<NzMessageService>(
      'NzMessageService',
      ['success'],
    );
    fuelUsageApiService = jasmine.createSpyObj<FuelUsagesApiService>(
      'FuelUsagesApiService',
      ['create'],
    );
    httpClientService = jasmine.createSpyObj<HttpClientService>(
      'HttpClientService',
      ['get'],
    );

    fuelUsageApiService.create.and.returnValue(of({ id: 1 } as any));
    httpClientService.get.and.returnValue(
      of([{ id: 1, vehicleType: 'Sedan', plateNumber: 'ABC123' }]),
    );

    await TestBed.configureTestingModule({
      imports: [AddTripComponent],
      providers: [
        TripService,
        { provide: NzMessageService, useValue: messageService },
        { provide: FuelUsagesApiService, useValue: fuelUsageApiService },
        { provide: HttpClientService, useValue: httpClientService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a success message after a trip is added', () => {
    component.addTripForm.setValue({
      tripDate: new Date('2024-02-11'),
      distanceTraveled: 20,
      fuelConsumptionRate: 8,
      vehicleId: 1,
    });

    component.addTrip();

    expect(messageService.success).toHaveBeenCalledWith(
      'Trip added successfully',
      {
        nzDuration: 3000,
      },
    );
  });
});
