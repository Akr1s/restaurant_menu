import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  @Input() selectedCategoryName: string;

  primaryCategoriesList: Category[] = [
    { name: 'All' },
    { name: 'First courses' },
    { name: 'Beverages' },
    { name: 'All' },
    { name: 'First courses' },
    { name: 'Beverages' },
    { name: 'All' },
    { name: 'First courses' },
    { name: 'Beverages' },
  ];

  @Output() categoryChangeEvent = new EventEmitter<string>();

  emitCategoryName(name: string) {
    this.categoryChangeEvent.emit(name);
  }

  changeCategory(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.emitCategoryName(target.value);
    }
  }

  changeCategoryFromNav(name: string) {
    this.emitCategoryName(name);
  }

  constructor() {}

  ngOnInit(): void {}
}
