import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { BillingComponent } from './billing.component';
import { BillingApiService } from '../../services/api/billing-api.service';

describe('BillingComponent', () => {
  let component: BillingComponent;
  let fixture: ComponentFixture<BillingComponent>;
  let billingApiService: jasmine.SpyObj<BillingApiService>;

  beforeEach(async () => {
    billingApiService = jasmine.createSpyObj<BillingApiService>(
      'BillingApiService',
      ['getAll'],
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
});
