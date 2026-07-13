import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client-service';
import { Observable } from 'rxjs';
import { IFuelSession } from '../../models/IFuelSession';

@Injectable({ providedIn: 'root' })
export class FuelSessionsApiService {
  private readonly baseEndpoint = 'api/FuelSessions';

  constructor(private http: HttpClientService) {}

  getAll(): Observable<IFuelSession[]> {
    return this.http.get<IFuelSession[]>(this.baseEndpoint);
  }

  create(session: IFuelSession): Observable<IFuelSession> {
    return this.http.post<IFuelSession>(this.baseEndpoint, session);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseEndpoint}/${id}`);
  }
}
