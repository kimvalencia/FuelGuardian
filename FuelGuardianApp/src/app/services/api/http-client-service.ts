import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class HttpClientService{
    private baseURL = 'https://localhost:7154/'

    constructor(private http: HttpClient) {}

    public get<T>(endpoint: string) {
        return this.http.get<T>(`${this.baseURL}${endpoint}`);
    }

    public post<T>(endpoint: string, data: any) {
        return this.http.post<T>(`${this.baseURL}${endpoint}`, data);
    }

    public put<T>(endpoint: string, data: any) {
        return this.http.put<T>(`${this.baseURL}${endpoint}`, data);
    }

    public delete<T>(endpoint: string) {
        return this.http.delete<T>(`${this.baseURL}${endpoint}`);
    }
}
