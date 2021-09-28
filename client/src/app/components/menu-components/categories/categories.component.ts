import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { PrimaryCategoryInterface } from 'src/app/interfaces/primaryCategory';
import categoryAll from 'src/app/constants/categoryAll';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  loading: boolean = true;
  sub: Subscription;
  @Input() selectedCategory: PrimaryCategoryInterface;

  primaryCategoriesList: PrimaryCategoryInterface[] = [];

  @Output() categoryChangeEvent = new EventEmitter<PrimaryCategoryInterface>();

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.loading = true;
    this.sub = this.categoriesService
      .getPrimaryCategories()
      .subscribe((data: PrimaryCategoryInterface[]) => {
        this.primaryCategoriesList = [categoryAll, ...data];
        this.loading = false;
      });
  }

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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
