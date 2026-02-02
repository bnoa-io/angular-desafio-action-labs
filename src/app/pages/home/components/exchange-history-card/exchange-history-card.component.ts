import { Component, Input } from '@angular/core';
import { ExchangeRateData } from '../../../../models/exchange-rate.model';

@Component({
  selector: 'app-exchange-history-card',
  templateUrl: './exchange-history-card.component.html',
  styleUrl: './exchange-history-card.component.css',
  standalone: false
})
export class ExchangeHistoryCardComponent {
  @Input() item!: ExchangeRateData;

  get isPositive(): boolean {
    return this.item.closeDiffPercent! >= 0;
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 4,
      maximumFractionDigits: 4
    });
  }

  formatPercent(value: number): string {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  }
}
