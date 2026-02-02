import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  CurrentExchangeRateResponse,
  DailyExchangeRateResponse
} from '../models/exchange-rate.model';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  private readonly baseUrl = 'https://api-brl-exchange.actionlabs.com.br/api/1.0';
  private readonly apiKey = 'RVZG0GHEV2KORLNA';

  constructor(private http: HttpClient) {}

  getCurrentExchangeRate(toCurrency: string): Observable<CurrentExchangeRateResponse> {
    const params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('from_symbol', toCurrency)
      .set('to_symbol', 'BRL');

    return this.http.get<CurrentExchangeRateResponse>(
      `${this.baseUrl}/open/currentExchangeRate`,
      { params }
    );
  }

  getDailyExchangeRate(toCurrency: string): Observable<DailyExchangeRateResponse> {
    const params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('from_symbol', toCurrency)
      .set('to_symbol', 'BRL');

    return this.http.get<DailyExchangeRateResponse>(
      `${this.baseUrl}/open/dailyExchangeRate`,
      { params }
    );
  }
}
