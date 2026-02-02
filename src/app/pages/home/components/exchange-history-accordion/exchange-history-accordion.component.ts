import { Component, Input } from '@angular/core';
import { ExchangeRateData } from '../../../../models/exchange-rate.model';

@Component({
  selector: 'app-exchange-history-accordion',
  templateUrl: './exchange-history-accordion.component.html',
  styleUrl: './exchange-history-accordion.component.css',
  standalone: false
})
export class ExchangeHistoryAccordionComponent {
  @Input() historyItems: ExchangeRateData[] = [];
  isExpanded: boolean = false;
}
