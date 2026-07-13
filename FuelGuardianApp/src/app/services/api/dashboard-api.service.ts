import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from './http-client-service';

export interface DashboardChartPointDto {
  label: string;
  value: number;
}

export interface DashboardSummaryDto {
  rateTrend: DashboardChartPointDto[];
  monthlyBilling: DashboardChartPointDto[];
}

@Injectable({ providedIn: 'root' })
export class DashboardApiService {
  private readonly baseEndpoint = 'api/Dashboard';

  constructor(private readonly http: HttpClientService) {}

  getSummary(): Observable<DashboardSummaryDto> {
    return this.http.get<DashboardSummaryDto>(`${this.baseEndpoint}/summary`);
  }
}
