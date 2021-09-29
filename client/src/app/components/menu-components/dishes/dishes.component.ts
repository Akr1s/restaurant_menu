import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PrimaryCategoryInterface } from 'src/app/interfaces/primaryCategory';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
})
export class DishesComponent implements OnInit {
  @Input() selectedCategory: PrimaryCategoryInterface;

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
