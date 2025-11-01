import { Injectable } from "@angular/core";
import { HttpClientService } from "../http-client-service";
import { ITrip } from "../../../models/ITrip";
import { Observable } from "rxjs";
import { API_ENDPOINTS } from "../Endpoints";

@Injectable({providedIn: 'root'})
export class FuelUsagesApiService {
    private baseURL = 'https://localhost:7154/'

    constructor(private http: HttpClientService) { 

    }

    public getAll(): Observable<ITrip[]> {
        return this.http.get<ITrip[]>(API_ENDPOINTS.FuelUsages.GET_ALL);
    }

    public create(trip: ITrip): Observable<ITrip> {
        return this.http.post<ITrip>(API_ENDPOINTS.FuelUsages.CREATE, trip);
    }

    public delete(id: number): Observable<void> {
        return this.http.delete<void>(API_ENDPOINTS.FuelUsages.DELETE(id));
    }
}
