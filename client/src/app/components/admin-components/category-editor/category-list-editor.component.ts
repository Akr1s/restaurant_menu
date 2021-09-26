import { Component, Input, OnInit } from '@angular/core';
import { CategoryInterface } from 'src/app/interfaces/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'category-list-editor',
  templateUrl: './category-list-editor.component.html',
  styleUrls: ['./category-list-editor.component.scss'],
})
export class CategoryEditorComponent implements OnInit {
  @Input() listTitle: string;
  @Input() listItemTitle: string;
  listItems: Array<CategoryInterface> = [];

  selectedListItem: CategoryInterface;

  isEditing: boolean = false;
  isAdding: boolean = false;

  constructor(private categoriesService: CategoriesService) {}

  loadCategories() {
    this.categoriesService.allCategoriesData.subscribe(
      (data: CategoryInterface[]) => {
        this.listItems = data;
        this.selectedListItem = data[0];
      }
    );
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  public selectItem = (item: CategoryInterface): void => {
    this.selectedListItem = item;
  };

  enableAdding() {
    this.isAdding = true;
  }

  public enableEditing = () => {
    this.isEditing = true;
  };
  public cancelEditing = () => {
    this.isEditing = false;
  };
  public cancelAdding = () => {
    this.isAdding = false;
  };
}
