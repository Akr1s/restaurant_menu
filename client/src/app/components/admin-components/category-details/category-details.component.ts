import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { RESPONSE_CODES } from 'src/app/constants/responseCodes';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'category-item-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
})
export class CategoryDetailsComponent implements OnInit, OnChanges {
  @Input() listItemTitle: string;
  @Input() selectedListItem: Category;
  @Input() enableEditing: () => void;
  @Input() isAdding: boolean;

  parentName: string = 'Null';

  constructor(private categoriesService: CategoriesService) {}

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
      this.parentName = data.name;
    });
  }

  checkNullCategory(category: Category) {
    const parent = category.parent;
    if (parent) {
      this.getCategoryNameById(parent);
    } else {
      this.parentName = 'Null';
    }
  }

  async deleteCategory() {
    const responseCode = await this.categoriesService.deleteCategory(
      this.selectedListItem.id
    );
    if (responseCode === RESPONSE_CODES.DELETE_SUCCESS) {
      alert('Category deleted');
    }
  }
}
