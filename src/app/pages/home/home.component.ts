import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: false
})
export class HomeComponent {
  currencies: string[] = ['USD', 'EUR', 'GBP', 'JPY', 'CND'];
  currencyControl = new FormControl('', Validators.required);
  exchangeRate: number = 0;
  showResult: boolean = false;

  onExchange(): void {
    this.currencyControl.markAsTouched();

    if (this.currencyControl.valid) {
      this.exchangeRate = 5.0;
      this.showResult = true;
    }
  }
}
