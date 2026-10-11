import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../app-config.service';

@Injectable({ providedIn: 'root' })
export class HttpClientService {
  private readonly baseURL: string;

  constructor(
    private readonly http: HttpClient,
    appConfig: AppConfigService,
  ) {
    this.baseURL = appConfig.baseURL;
  }

  private resolveUrl(endpoint: string): string {
    return `${this.baseURL}${endpoint.replace(/^\/+/, '')}`;
  }

  public get<T>(endpoint: string) {
    return this.http.get<T>(this.resolveUrl(endpoint));
  }

  public post<T>(endpoint: string, data: unknown) {
    return this.http.post<T>(this.resolveUrl(endpoint), data);
  }

  public put<T>(endpoint: string, data: unknown) {
    return this.http.put<T>(this.resolveUrl(endpoint), data);
  }

  public delete<T>(endpoint: string) {
    return this.http.delete<T>(this.resolveUrl(endpoint));
  }
}
