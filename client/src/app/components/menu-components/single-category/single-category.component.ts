import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { PrimaryCategoryInterface } from 'src/app/interfaces/primaryCategory';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.scss'],
})
export class SingleCategoryComponent implements OnInit {
  primaryCategoriesList: PrimaryCategoryInterface[];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService
      .getPrimaryCategories()
      .subscribe((data: PrimaryCategoryInterface[]) => {
        this.primaryCategoriesList = data;
      });
  }
}
