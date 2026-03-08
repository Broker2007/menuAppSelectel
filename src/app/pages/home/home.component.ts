import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  // Данные для приветствия
  appName = 'Меню Ресторана';
  currentTime = new Date().toLocaleTimeString();
  
  // Обновляем время каждую секунду (просто для демонстрации)
  constructor() {
    setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString();
    }, 1000);
  }
}