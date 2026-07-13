import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { BillingComponent } from './billing.component';
import { BillingApiService } from '../../../services/api/billing-api.service';

describe('BillingComponent', () => {
  let component: BillingComponent;
  let fixture: ComponentFixture<BillingComponent>;
  let billingApiService: jasmine.SpyObj<BillingApiService>;

  beforeEach(async () => {
    billingApiService = jasmine.createSpyObj<BillingApiService>(
      'BillingApiService',
      ['getAll', 'getById'],
    );
    billingApiService.getAll.and.returnValue(
      of([
        {
          id: 1,
          startDate: '2025-01-01T00:00:00Z',
          endDate: '2025-01-31T00:00:00Z',
          total: 125.5,
          isPaid: false,
          remarks: 'Test billing',
        },
      ]),
    );
    billingApiService.getById.and.returnValue(
      of({
        id: 1,
        startDate: '2025-01-01T00:00:00Z',
        endDate: '2025-01-31T00:00:00Z',
        total: 125.5,
        isPaid: false,
        remarks: 'Test billing',
        details: [
          { id: 10, fuelUsageId: 20, fuelSessionId: 30, amount: 125.5 },
        ],
      }),
    );

    await TestBed.configureTestingModule({
      imports: [BillingComponent],
      providers: [{ provide: BillingApiService, useValue: billingApiService }],
    }).compileComponents();

    fixture = TestBed.createComponent(BillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load billing headers', () => {
    expect(component).toBeTruthy();
    expect(billingApiService.getAll).toHaveBeenCalled();
    expect(component.billings).toHaveSize(1);
  });

  it('should select a billing header to show details', () => {
    component.selectBilling(component.billings[0]);

    expect(component.selectedBilling?.id).toBe(1);
    expect(billingApiService.getById).toHaveBeenCalledWith(1);
  });
});
