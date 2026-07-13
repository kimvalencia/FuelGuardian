import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import {
  BillingApiService,
  BillingHeaderDto,
} from '../../services/api/billing-api.service';

@Component({
  selector: 'app-billing',
  imports: [
    CommonModule,
    NzButtonModule,
    NzCardModule,
    NzTableModule,
    NzTagModule,
    DatePipe,
  ],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss',
})
export class BillingComponent implements OnInit {
  billings: BillingHeaderDto[] = [];
  isLoading = false;

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

  trackById(index: number, item: BillingHeaderDto): number {
    return item.id ?? index;
  }
}
