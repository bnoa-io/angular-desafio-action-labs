import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-exchange-result',
  templateUrl: './exchange-result.component.html',
  styleUrl: './exchange-result.component.css',
  standalone: false
})
export class ExchangeResultComponent {
  @Input() currency: string = '';
  @Input() exchangeRate: number = 0;
  @Input() lastUpdatedAt: string = '';

  get formattedDateTime(): string {
    const date = new Date(this.lastUpdatedAt);
    return date.toLocaleString().replace(',', ' -').split(':', 2).join('h');
  }

  get formattedRate(): string {
    return this.exchangeRate.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }
}
