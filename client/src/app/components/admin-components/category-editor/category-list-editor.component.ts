import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'category-list-editor',
  templateUrl: './category-list-editor.component.html',
  styleUrls: ['./category-list-editor.component.scss'],
})
export class CategoryEditorComponent implements OnInit {
  @Input() listTitle: string;
  @Input() listItemTitle: string;
  listItems: Array<Category> = [];

  selectedListItem: Category;

  isEditing: boolean = false;
  isAdding: boolean = false;

  constructor(private categoriesService: CategoriesService) {}

  loadCategories() {
    this.categoriesService.getAllCategories().subscribe((data: Category[]) => {
      this.listItems = data;
      this.selectedListItem = data[0];
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  public selectItem = (item: Category): void => {
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
