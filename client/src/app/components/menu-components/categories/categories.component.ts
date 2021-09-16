import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/models/category.model';

class CategoryClass {
  constructor(
    public id: number,
    public name: string,
    public show: boolean,
    public category: any
  ) {}
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  @Input() selectedCategoryName: string;

  categories: CategoryClass[];

  primaryCategoriesList: Category[] = [
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

  constructor(private categoriesService: CategoriesService) {
    categoriesService.getCategories();
  }

  ngOnInit(): void {}
}
