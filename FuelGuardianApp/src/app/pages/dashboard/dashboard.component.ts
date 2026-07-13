import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { NzCardModule } from 'ng-zorro-antd/card';
import {
  DashboardApiService,
  DashboardSummaryDto,
} from '../../services/api/dashboard-api.service';

@Component({
  selector: 'app-dashboard',
  imports: [NzCardModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  summary: DashboardSummaryDto = { rateTrend: [], monthlyBilling: [] };
  isLoading = false;

  rateTrendChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Fuel Rate',
        borderColor: '#1890ff',
        backgroundColor: 'rgba(24,144,255,0.15)',
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: '#1890ff',
      },
    ],
  };

  rateTrendChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        grid: { color: '#f0f0f0' },
      },
    },
  };

  billingChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Billing Cost',
        borderColor: '#52c41a',
        backgroundColor: 'rgba(82,196,26,0.15)',
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: '#52c41a',
      },
    ],
  };

  billingChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        grid: { color: '#f0f0f0' },
      },
    },
  };

  constructor(private readonly dashboardApi: DashboardApiService) {}

  ngOnInit(): void {
    this.loadSummary();
  }

  loadSummary(): void {
    this.isLoading = true;
    this.dashboardApi.getSummary().subscribe({
      next: (data) => {
        this.summary = data;
        this.buildChartData();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Unable to load dashboard summary', error);
        this.isLoading = false;
      },
    });
  }

  private buildChartData(): void {
    this.rateTrendChartData = {
      labels: this.summary.rateTrend.map((p) => p.label),
      datasets: [
        {
          data: this.summary.rateTrend.map((p) => Number(p.value)),
          label: 'Fuel Rate',
          borderColor: '#1890ff',
          backgroundColor: 'rgba(24,144,255,0.15)',
          fill: true,
          tension: 0.3,
          pointRadius: 4,
          pointBackgroundColor: '#1890ff',
        },
      ],
    };

    this.billingChartData = {
      labels: this.summary.monthlyBilling.map((p) => p.label),
      datasets: [
        {
          data: this.summary.monthlyBilling.map((p) => Number(p.value)),
          label: 'Billing Cost',
          borderColor: '#52c41a',
          backgroundColor: 'rgba(82,196,26,0.15)',
          fill: true,
          tension: 0.3,
          pointRadius: 4,
          pointBackgroundColor: '#52c41a',
        },
      ],
    };
  }
}
