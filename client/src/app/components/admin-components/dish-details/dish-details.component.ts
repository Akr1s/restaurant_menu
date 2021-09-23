import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { RESPONSE_CODES } from 'src/app/constants/responseCodes';
import { Category } from 'src/app/models/category.model';
import { Dish } from 'src/app/models/dish.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { DishesService } from 'src/app/services/dishes.service';

@Component({
  selector: 'dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.scss'],
})
export class DishDetailsComponent implements OnInit {
  @Input() listItemTitle: string;
  @Input() selectedListItem: Dish;
  @Input() enableEditing: () => void;
  @Input() isAdding: boolean;

  categoryName: string = 'Null';

  constructor(
    private dishService: DishesService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    if (this.selectedListItem) {
      this.checkNullCategory(this.selectedListItem);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedListItem && changes.selectedListItem.currentValue)
      this.checkNullCategory(changes.selectedListItem.currentValue);
  }

  getCategoryNameById(id: string) {
    this.categoriesService.getSingleCategory(id).subscribe((data: Category) => {
      this.categoryName = data.name;
    });
  }

  checkNullCategory(dish: Dish) {
    const category = dish.category;
    if (category) {
      this.getCategoryNameById(category);
    } else {
      this.categoryName = 'Null';
    }
  }

  async deleteDish() {
    const responseCode = await this.dishService.deleteDish(
      this.selectedListItem.id
    );
    if (responseCode === RESPONSE_CODES.DELETE_SUCCESS) {
      alert('Category deleted');
    }
  }
}
