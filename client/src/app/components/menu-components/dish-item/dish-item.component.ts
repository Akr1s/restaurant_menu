import { Component, Input, OnInit } from '@angular/core';
import { DishInterface } from 'src/app/interfaces/dish';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-dish-item',
  templateUrl: './dish-item.component.html',
  styleUrls: ['./dish-item.component.scss'],
})
export class DishItemComponent implements OnInit {
  @Input() dish: DishInterface;
  categoryName: string;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    const category = this.categoriesService.getSingleCategory(
      this.dish.category
    );
    this.categoryName = category.name;
  }
}
