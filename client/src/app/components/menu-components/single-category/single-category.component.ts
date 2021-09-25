import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { PrimaryCategory } from 'src/app/models/primaryCategory.model';
import categoryAll from 'src/app/constants/categoryAll';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.scss'],
})
export class SingleCategoryComponent implements OnInit {
  primaryCategoriesList: PrimaryCategory[];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService
      .getPrimaryCategories()
      .subscribe((data: PrimaryCategory[]) => {
        this.primaryCategoriesList = data;
      });
  }
}
