import { Component } from '@angular/core';
import { ExchangeHistoryItem } from '../exchange-history-card/exchange-history-card.component';

@Component({
  selector: 'app-exchange-history-accordion',
  templateUrl: './exchange-history-accordion.component.html',
  styleUrl: './exchange-history-accordion.component.css',
  standalone: false
})
export class ExchangeHistoryAccordionComponent {
  isExpanded: boolean = false;

  historyItems: ExchangeHistoryItem[] = [
    {
      date: new Date(2022, 2, 9),
      open: 5.0666,
      close: 5.0038,
      high: 5.0689,
      low: 4.9836,
      closeDiffPercent: 1.15
    },
    {
      date: new Date(2022, 2, 8),
      open: 5.0666,
      close: 5.0038,
      high: 5.0689,
      low: 4.9836,
      closeDiffPercent: 1.15
    },
    {
      date: new Date(2022, 2, 7),
      open: 5.0666,
      close: 5.0038,
      high: 5.0689,
      low: 4.9836,
      closeDiffPercent: -0.85
    },
    {
      date: new Date(2022, 2, 6),
      open: 5.0666,
      close: 5.0038,
      high: 5.0689,
      low: 4.9836,
      closeDiffPercent: 1.15
    },
    {
      date: new Date(2022, 2, 5),
      open: 5.0666,
      close: 5.0038,
      high: 5.0689,
      low: 4.9836,
      closeDiffPercent: -2.30
    }
  ];
}
