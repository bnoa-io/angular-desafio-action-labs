import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  EMPTY,
  Subject,
  catchError,
  debounceTime,
  exhaustMap,
  filter,
  finalize,
  forkJoin,
  takeUntil,
  tap
} from 'rxjs';

import { ExchangeService } from '../../services/exchange.service';
import { ExchangeRateData } from '../../models/exchange-rate.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: false
})
export class HomeComponent implements OnInit, OnDestroy {
  currencies: string[] = ['USD', 'EUR', 'GBP', 'JPY', 'CAD'];
  currencyControl = new FormControl('', Validators.required);
  exchangeRate: number = 0;
  lastUpdatedAt: string = '';
  showResult: boolean = false;
  isLoading: boolean = false;
  historyItems: ExchangeRateData[] = [];
  hasError: boolean = false;

  private exchangeClick$ = new Subject<void>();
  private destroy$ = new Subject<void>();

  constructor(private exchangeService: ExchangeService) {}

  ngOnInit(): void {
    this.currencyControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.showResult = false;
        this.exchangeRate = 0;
        this.lastUpdatedAt = '';
        this.historyItems = [];
      });

    this.exchangeClick$
      .pipe(
        debounceTime(300),
        filter(() => {
          this.currencyControl.markAsTouched();
          return this.currencyControl.valid && !this.isLoading;
        }),
        tap(() => {
          this.isLoading = true;
          this.currencyControl.disable({ emitEvent: false });
        }),
        // exhaustMap, ignora novas emissões enquanto não completar e assim como switchMap altera o obeservable
        exhaustMap(() =>
          forkJoin({
            current: this.exchangeService.getCurrentExchangeRate(this.currencyControl.value!),
            daily: this.exchangeService.getDailyExchangeRate(this.currencyControl.value!)
          }).pipe(
            catchError((err) => {
              console.error('Error fetching exchange rate:', err);
              this.hasError = true;
              this.showResult = false;
              return EMPTY;
            }),
            finalize(() => {
              this.isLoading = false;
              this.currencyControl.enable({ emitEvent: false });
            })
          )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(({ current, daily }) => {
        this.hasError = false;

        if (current.success) {
          this.exchangeRate = current.exchangeRate;
          this.lastUpdatedAt = current.lastUpdatedAt;
          this.showResult = true;
        }

        if (daily.success && daily.data) {
          this.historyItems = this._processHistoryData(daily.data);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onExchange(): void {
    this.exchangeClick$.next();
  }

  private _processHistoryData(data: ExchangeRateData[]): ExchangeRateData[] {
    const sortedData = [...data]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 30);

    return sortedData.map((item, index) => {
      let closeDiffPercent = 0;
      if (index < sortedData.length - 1) {
        const previousClose = sortedData[index + 1].close;
        closeDiffPercent = ((item.close - previousClose) / previousClose) * 100;
      }

      return {
        date: new Date(item.date).toLocaleDateString('pt-BR'),
        open: item.open,
        close: item.close,
        high: item.high,
        low: item.low,
        closeDiffPercent
      };
    });
  }
}
