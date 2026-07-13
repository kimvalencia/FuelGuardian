import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from './http-client-service';

export interface BillingDetailDto {
  id: number;
  fuelUsageId: number;
  fuelSessionId: number;
  amount: number;
  tripDate?: string | null;
  dateFueled?: string | null;
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

  compute(id: number): Observable<BillingHeaderDto> {
    return this.http.post<BillingHeaderDto>(`${this.baseEndpoint}/Compute`, id);
  }
}
