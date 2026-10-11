import { Injectable } from '@angular/core';

interface RuntimeEnvironment {
  baseURL: string;
}

declare global {
  interface Window {
    __env?: Partial<RuntimeEnvironment>;
  }
}

const FALLBACK_BASE_URL = 'https://localhost:7154/';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  public get baseURL(): string {
    return this.normalize(window.__env?.baseURL) ?? FALLBACK_BASE_URL;
  }

  private normalize(value: string | undefined): string | null {
    if (!value) {
      return null;
    }

    try {
      const url = new URL(value);
      if (!url.pathname.endsWith('/')) {
        url.pathname += '/';
      }
      return url.href;
    } catch {
      return null;
    }
  }
}
