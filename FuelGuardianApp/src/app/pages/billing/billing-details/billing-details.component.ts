import { Component, Inject, OnInit, Optional } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { NzTagModule } from 'ng-zorro-antd/tag';
import {
  BillingApiService,
  BillingHeaderDto,
} from '../../../services/api/billing-api.service';

@Component({
  selector: 'app-billing-details',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzCardModule, NzTagModule, DatePipe],
  templateUrl: './billing-details.component.html',
  styleUrl: './billing-details.component.scss',
})
export class BillingDetailsComponent implements OnInit {
  billing: BillingHeaderDto | null = null;
  isLoading = false;

  constructor(
    @Optional()
    @Inject(NZ_MODAL_DATA)
    private readonly modalData: { billingId: number },
    private readonly billingApi: BillingApiService,
  ) {}

  ngOnInit(): void {
    const billingId = this.modalData?.billingId;
    if (!billingId) {
      return;
    }

    this.isLoading = true;
    this.billingApi.getById(billingId).subscribe({
      next: (data) => {
        this.billing = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Unable to load billing details', error);
        this.isLoading = false;
      },
    });
  }
}
