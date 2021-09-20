import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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

  parentName: string = 'Null';

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.checkNullCategory(this.selectedListItem);
  }

  ngOnChanges(changes: SimpleChanges) {
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
}
