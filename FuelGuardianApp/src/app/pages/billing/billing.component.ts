import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import {
  BillingApiService,
  BillingHeaderDto,
} from '../../services/api/billing-api.service';
import { BillingDetailsComponent } from './billing-details/billing-details.component';

@Component({
  selector: 'app-billing',
  imports: [
    CommonModule,
    NzButtonModule,
    NzCardModule,
    NzModalModule,
    NzPopconfirmModule,
    NzTableModule,
    NzTagModule,
    DatePipe,
  ],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss',
})
export class BillingComponent implements OnInit {
  billings: BillingHeaderDto[] = [];
  selectedBilling: BillingHeaderDto | null = null;
  isLoading = false;
  isDetailsLoading = false;

  constructor(
    private readonly billingApi: BillingApiService,
    private readonly modalService: NzModalService,
  ) {}

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

    this.openDetailsModal(billing.id);
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

  openDetailsModal(billingId: number): void {
    this.modalService.create({
      nzTitle: `Billing Details #${billingId}`,
      nzContent: BillingDetailsComponent,
      nzWidth: 720,
      nzData: { billingId },
      nzFooter: null,
    });
  }

  trackById(index: number, item: BillingHeaderDto): number {
    return item.id ?? index;
  }
}
