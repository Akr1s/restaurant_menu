import { Component, Input, OnInit } from '@angular/core';
import { Dish } from 'src/app/models/dish.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-dish-item',
  templateUrl: './dish-item.component.html',
  styleUrls: ['./dish-item.component.scss'],
})
export class DishItemComponent implements OnInit {
  @Input() dish: Dish;
  categoryName: string;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    const category = this.categoriesService.getSingleCategory(
      this.dish.category
    );
    this.categoryName = category.name;
  }
}
