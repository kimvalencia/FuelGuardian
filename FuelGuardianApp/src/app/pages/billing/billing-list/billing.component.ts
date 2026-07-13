import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import {
  BillingApiService,
  BillingHeaderDto,
} from '../../../services/api/billing-api.service';
import { BillingDetailsComponent } from '../billing-details/billing-details.component';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-billing',
  imports: [
    CommonModule,
    NzButtonModule,
    NzCardModule,
    NzPopconfirmModule,
    NzTableModule,
    NzTagModule,
    DatePipe,
    NzIconModule,
    BillingDetailsComponent,
  ],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss',
})
export class BillingComponent implements OnInit {
  billings: BillingHeaderDto[] = [];
  selectedBillingId: number | null = null;
  isLoading = false;
  isDetailsLoading = false;

  constructor(private readonly billingApi: BillingApiService) {}

  ngOnInit(): void {
    this.loadBillings();
  }

  loadBillings(): void {
    this.isLoading = true;
    this.billingApi.getAll().subscribe({
      next: (data) => {
        this.billings = data ?? [];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Unable to load billing headers', error);
        this.isLoading = false;
      },
    });
  }

  selectBilling(billing: BillingHeaderDto): void {
    if (!billing?.id) {
      return;
    }

    this.selectedBillingId = billing.id;
  }

  backToList(): void {
    this.selectedBillingId = null;
  }

  computeBilling(billing: BillingHeaderDto): void {
    if (!billing?.id) {
      return;
    }

    this.billingApi.compute(billing.id).subscribe({
      next: () => {
        this.loadBillings();
      },
      error: (error) => {
        console.error('Unable to compute billing', error);
      },
    });
  }

  trackById(index: number, item: BillingHeaderDto): number {
    return item.id ?? index;
  }
}
