import { Component } from '@angular/core';
import { HomeModule } from './pages/home/home.module';

@Component({
  selector: 'app-root',
  imports: [
    HomeModule
  ],
  template: `<app-home></app-home>`,
})
export class AppComponent {
}
