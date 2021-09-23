import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { PrimaryCategory } from 'src/app/models/primaryCategory.model';
import categoryAll from 'src/app/constants/categoryAll';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  @Input() selectedCategory: PrimaryCategory;

  primaryCategoriesList: PrimaryCategory[] = [];

  @Output() categoryChangeEvent = new EventEmitter<PrimaryCategory>();

  emitCategory(category: PrimaryCategory) {
    this.categoryChangeEvent.emit(category);
  }

  changeCategory(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      const clickedCategory: PrimaryCategory =
        this.primaryCategoriesList.filter(
          (category) => category.id === target.value
        )[0];
      this.emitCategory(clickedCategory);
    }
  }

  changeCategoryFromNav(category: PrimaryCategory) {
    this.emitCategory(category);
  }

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService.allPrimaryCategoriesData.subscribe(
      (data: any) =>
        (this.primaryCategoriesList = [...this.primaryCategoriesList, ...data])
    );
  }
}
