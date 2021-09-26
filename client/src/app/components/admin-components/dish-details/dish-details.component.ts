import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { RESPONSE_CODES } from 'src/app/constants/responseCodes';
import { Category } from 'src/app/models/category.model';
import { Dish } from 'src/app/models/dish.model';
import { PrimaryCategory } from 'src/app/models/primaryCategory.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { DishesService } from 'src/app/services/dishes.service';

@Component({
  selector: 'dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.scss'],
})
export class DishDetailsComponent implements OnInit, OnChanges {
  @Input() listItemTitle: string;
  @Input() selectedListItem: Dish;
  @Input() enableEditing: () => void;
  @Input() isAdding: boolean;

  categoryList: PrimaryCategory[] = [];
  itemCategory: string = 'Null';
  dishImageString: string;

  constructor(
    private dishService: DishesService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.dishImageString = this.checkImageLink(this.selectedListItem);
    this.categoriesService.allNonPrimaryCategoriesData.subscribe(
      (data: PrimaryCategory[]) => {
        this.categoryList = data;
        this.itemCategory = this.getCategoryNameById(
          this.selectedListItem.category
        );
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedListItem) {
      this.dishImageString = this.checkImageLink(this.selectedListItem);
      this.itemCategory = this.getCategoryNameById(
        changes.selectedListItem.currentValue.category
      );
    }
  }

  getCategoryNameById(id: string): string {
    const category = this.categoryList.filter((item) => item.id === id)[0];
    return category ? category.name : 'Null';
  }

  async deleteDish() {
    const responseCode = await this.dishService.deleteDish(
      this.selectedListItem.id
    );
    if (responseCode === RESPONSE_CODES.DELETE_SUCCESS) {
      alert('Dish deleted');
    }
  }

  checkImageLink(dish: Dish) {
    let image = dish.img;
    if (!image.startsWith('http')) image = 'Long base64 string';
    return image;
  }
}
