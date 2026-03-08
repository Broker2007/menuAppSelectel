import { Injectable, signal } from '@angular/core';
import { MenuItem } from '../models/menu-item';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuItemsSignal = signal<MenuItem[]>([
    { id: 1, name: 'Пицца', value: 450, checked: false },
    { id: 2, name: 'Бургер', value: 350, checked: true },
    { id: 3, name: 'Салат', value: 250, checked: false },
    { id: 4, name: 'Суши', value: 600, checked: true },
    { id: 5, name: 'Паста', value: 400, checked: false },
    { id: 6, name: 'Суп', value: 200, checked: false },
  ]);
  
  // Сохраняем оригинальный порядок для сброса сортировки
  private originalOrder: MenuItem[] = [];

  constructor() {
    this.originalOrder = [...this.menuItemsSignal()];
  }

  getMenuItems() {
    return this.menuItemsSignal;
  }

  toggleCheckbox(id: number) {
    this.menuItemsSignal.update(items => 
      items.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }

  selectAll() {
    this.menuItemsSignal.update(items => 
      items.map(item => ({ ...item, checked: true }))
    );
  }

  deselectAll() {
    this.menuItemsSignal.update(items => 
      items.map(item => ({ ...item, checked: false }))
    );
  }

  sortItems(compareFn: (a: MenuItem, b: MenuItem) => number) {
    this.menuItemsSignal.update(items => 
      [...items].sort(compareFn)
    );
  }

  resetSort() {
    this.menuItemsSignal.set([...this.originalOrder]);
  }

  getSelectedItems() {
    return this.menuItemsSignal().filter(item => item.checked);
  }

  getSelectedCount() {
    return this.getSelectedItems().length;
  }

  getSelectedTotal() {
    return this.getSelectedItems().reduce((sum, item) => sum + item.value, 0);
  }
}