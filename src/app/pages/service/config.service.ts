import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface AppConfig {
    apiBaseUrl: string;
    loginEndpoint: string;
    userDetailsEndpoint: string;
  }
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config!: AppConfig;
  private http = inject(HttpClient);

  constructor() {}

  loadConfig(): Promise<void> {
    return firstValueFrom(this.http.get<AppConfig>('/assets/config/config.json'))
      .then(config => {
        this.config = config;
      })
      .catch(error => {
        console.error('Could not load config file:', error);
      });
  }

  getConfig(): AppConfig {
    return this.config;
  }

  getApiBaseUrl(): string {
    return this.config?.apiBaseUrl || '';
  }
}
