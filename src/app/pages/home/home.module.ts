import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ExchangeHistoryAccordionComponent } from './components/exchange-history-accordion/exchange-history-accordion.component';
import { ExchangeHistoryCardComponent } from './components/exchange-history-card/exchange-history-card.component';
import { ExchangeResultComponent } from './components/exchange-result/exchange-result.component';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    ExchangeHistoryAccordionComponent,
    ExchangeHistoryCardComponent,
    ExchangeResultComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
