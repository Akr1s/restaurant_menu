import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { RESPONSE_CODES } from 'src/app/constants/responseCodes';
import { DishInterface } from 'src/app/interfaces/dish';
import { PrimaryCategoryInterface } from 'src/app/interfaces/primaryCategory';
import { CategoriesService } from 'src/app/services/categories.service';
import { DishesService } from 'src/app/services/dishes.service';

@Component({
  selector: 'dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.scss'],
})
export class DishDetailsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() listItemTitle: string;
  @Input() selectedListItem: DishInterface;
  @Input() enableEditing: () => void;
  @Input() isAdding: boolean;

  categoryList: PrimaryCategoryInterface[] = [];
  itemCategory: string = 'Null';
  dishImageString: string;
  sub: Subscription;

  constructor(
    private dishService: DishesService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    if (this.selectedListItem) {
      this.sub = this.categoriesService.allNonPrimaryCategoriesData.subscribe(
        (data: PrimaryCategoryInterface[]) => {
          this.categoryList = data;
          this.itemCategory = this.getCategoryNameById(
            this.selectedListItem.category
          );
        }
      );
      this.dishImageString = this.checkImageLink(this.selectedListItem);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedListItem && changes.selectedListItem.currentValue) {
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
    const isConfirmed = confirm('Are you sure?');
    let responseCode = RESPONSE_CODES.DELETE_ERROR;
    if (isConfirmed) {
      try {
        responseCode = await this.dishService.deleteDish(
          this.selectedListItem.id
        );
        if (responseCode === RESPONSE_CODES.DELETE_SUCCESS) {
          alert('Dish deleted');
        }
      } catch (error) {
        console.log(error);
      }
    }
    return responseCode;
  }

  checkImageLink(dish: DishInterface) {
    let image = dish.img;
    if (!image.startsWith('http')) image = 'Long base64 string';
    return image;
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
