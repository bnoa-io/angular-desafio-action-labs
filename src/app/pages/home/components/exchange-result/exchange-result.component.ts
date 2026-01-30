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

  get currentDateTime(): string {
    const now = new Date();
    const date = now.toLocaleDateString('pt-BR');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${date} - ${hours}h${minutes}`;
  }

  get formattedRate(): string {
    return this.exchangeRate.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }
}
