import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { PrimaryCategoryInterface } from 'src/app/interfaces/primaryCategory';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.scss'],
})
export class SingleCategoryComponent implements OnInit, OnDestroy {
  primaryCategoriesList: PrimaryCategoryInterface[];
  sub: Subscription;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.sub = this.categoriesService
      .getPrimaryCategories()
      .subscribe((data: PrimaryCategoryInterface[]) => {
        this.primaryCategoriesList = data;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
