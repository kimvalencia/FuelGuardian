import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTableModule } from 'ng-zorro-antd/table';
import {
  BillingApiService,
  BillingHeaderDto,
} from '../../../services/api/billing-api.service';

@Component({
  selector: 'app-billing-details',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzCardModule,
    NzTagModule,
    NzTableModule,
    DatePipe,
  ],
  templateUrl: './billing-details.component.html',
  styleUrl: './billing-details.component.scss',
})
export class BillingDetailsComponent implements OnInit {
  @Input() billingId: number | null = null;
  billing: BillingHeaderDto | null = null;
  isLoading = false;

  constructor(private readonly billingApi: BillingApiService) {}

  ngOnInit(): void {
    this.loadBillingDetails();
  }

  loadBillingDetails(): void {
    if (!this.billingId) {
      return;
    }

    this.isLoading = true;
    this.billingApi.getById(this.billingId).subscribe({
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
