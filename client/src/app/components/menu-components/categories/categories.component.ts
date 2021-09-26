import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { PrimaryCategoryInterface } from 'src/app/interfaces/primaryCategory';
import categoryAll from 'src/app/constants/categoryAll';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  @Input() selectedCategory: PrimaryCategoryInterface;

  primaryCategoriesList: PrimaryCategoryInterface[] = [];

  @Output() categoryChangeEvent = new EventEmitter<PrimaryCategoryInterface>();

  emitCategory(category: PrimaryCategoryInterface) {
    this.categoryChangeEvent.emit(category);
  }

  changeCategory(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      const clickedCategory: PrimaryCategoryInterface =
        this.primaryCategoriesList.filter(
          (category) => category.id === target.value
        )[0];
      this.emitCategory(clickedCategory);
    }
  }

  changeCategoryFromNav(category: PrimaryCategoryInterface) {
    this.emitCategory(category);
  }

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService
      .getPrimaryCategories()
      .subscribe(
        (data: any) => (this.primaryCategoriesList = [categoryAll, ...data])
      );
  }
}
