import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from './http-client-service';

export interface BillingDetailDto {
  id: number;
  fuelUsageId: number;
  fuelSessionId: number;
  amount: number;
}

export interface BillingHeaderDto {
  id: number;
  startDate: string;
  endDate: string;
  total: number;
  isPaid: boolean;
  remarks: string;
  details?: BillingDetailDto[];
}

@Injectable({ providedIn: 'root' })
export class BillingApiService {
  private readonly baseEndpoint = 'api/Billing';

  constructor(private readonly http: HttpClientService) {}

  getAll(): Observable<BillingHeaderDto[]> {
    return this.http.get<BillingHeaderDto[]>(this.baseEndpoint);
  }

  getById(id: number): Observable<BillingHeaderDto> {
    return this.http.get<BillingHeaderDto>(`${this.baseEndpoint}/${id}`);
  }
}
