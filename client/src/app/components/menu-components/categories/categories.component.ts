import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { PrimaryCategory } from 'src/app/models/primaryCategory.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  @Input() selectedCategoryName: string;

  primaryCategoriesList: PrimaryCategory[] = [{ id: '1', name: 'All' }];

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

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService
      .getCategories()
      .subscribe(
        (data: any) =>
          (this.primaryCategoriesList = [
            ...this.primaryCategoriesList,
            ...data,
          ])
      );
  }
}
