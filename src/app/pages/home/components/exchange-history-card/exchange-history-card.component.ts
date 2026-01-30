import { Component, Input } from '@angular/core';

export interface ExchangeHistoryItem {
  date: Date;
  open: number;
  close: number;
  high: number;
  low: number;
  closeDiffPercent: number;
}

@Component({
  selector: 'app-exchange-history-card',
  templateUrl: './exchange-history-card.component.html',
  styleUrl: './exchange-history-card.component.css',
  standalone: false
})
export class ExchangeHistoryCardComponent {
  @Input() item!: ExchangeHistoryItem;

  get formattedDate(): string {
    return this.item.date.toLocaleDateString('pt-BR');
  }

  get isPositive(): boolean {
    return this.item.closeDiffPercent >= 0;
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  formatPercent(value: number): string {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  }
}
