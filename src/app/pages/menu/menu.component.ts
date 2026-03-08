import { Component, inject, computed, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class MenuComponent {
  menuService = inject(MenuService);
  
  // Вычисляемые значения для удобства
  selectedCount = computed(() => this.menuService.getSelectedCount());
  selectedTotal = computed(() => this.menuService.getSelectedTotal());
  
  // Статистика для отображения
  totalItems = computed(() => this.menuService.getMenuItems()().length);
  selectedPercentage = computed(() => 
    ((this.selectedCount() / this.totalItems()) * 100).toFixed(1)
  );
  
  // Сортировка и фильтрация
  sortOrder: 'asc' | 'desc' | 'none' = 'none';
  
  constructor() {
    // Эффект для логирования изменений (опционально)
    effect(() => {
      console.log(`Выбрано позиций: ${this.selectedCount()}, на сумму: ${this.selectedTotal()}₽`);
    });
  }

  toggleItem(id: number) {
    this.menuService.toggleCheckbox(id);
  }

  selectAll() {
    this.menuService.selectAll();
  }

  deselectAll() {
    this.menuService.deselectAll();
  }

  toggleSort() {
    const items = this.menuService.getMenuItems()();
    
    switch (this.sortOrder) {
      case 'none':
        this.sortOrder = 'asc';
        this.menuService.sortItems((a, b) => a.value - b.value);
        break;
      case 'asc':
        this.sortOrder = 'desc';
        this.menuService.sortItems((a, b) => b.value - a.value);
        break;
      case 'desc':
        this.sortOrder = 'none';
        this.menuService.resetSort();
        break;
    }
  }

  getSortButtonText(): string {
    switch (this.sortOrder) {
      case 'asc': return 'Сортировка ↑';
      case 'desc': return 'Сортировка ↓';
      default: return 'Без сортировки';
    }
  }
  getCategory(name: string): string {
    const categories: { [key: string]: string } = {
      'Пицца': 'Итальянская',
      'Бургер': 'Американская',
      'Салат': 'Европейская',
      'Суши': 'Японская',
      'Паста': 'Итальянская',
      'Суп': 'Европейская'
    };
    return categories[name] || 'Разное';
  }

  getTotalWithDiscount(discountPercent: number = 0): number {
    if (discountPercent <= 0) return this.selectedTotal();
    const discount = (this.selectedTotal() * discountPercent) / 100;
    return this.selectedTotal() - discount;
  }
}