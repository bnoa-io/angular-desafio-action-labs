import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  Subject,
  debounceTime,
  exhaustMap,
  filter,
  finalize,
  takeUntil,
  tap
} from 'rxjs';

import { ExchangeService } from '../../services/exchange.service';

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
      });

    this.exchangeClick$
      .pipe(
        debounceTime(300),
        filter(() => {
          this.currencyControl.markAsTouched();
          return this.currencyControl.valid && !this.isLoading;
        }),
        tap(() => (this.isLoading = true)),
        exhaustMap(() =>
          // exhaustMap, ignora novas emissões enquanto não completar e muda o valor do obeservable
          this.exchangeService
            .getCurrentExchangeRate(this.currencyControl.value!)
            .pipe(finalize(() => (this.isLoading = false)))
        ),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.exchangeRate = response.exchangeRate;
            this.lastUpdatedAt = response.lastUpdatedAt;
            this.showResult = true;
          }
        },
        error: (err) => {
          console.error('Error fetching exchange rate:', err);
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
}
