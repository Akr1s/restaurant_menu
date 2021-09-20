import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'category-list-editor',
  templateUrl: './category-list-editor.component.html',
  styleUrls: ['./category-list-editor.component.scss'],
})
export class CategoryEditorComponent implements OnInit {
  @Input() listTitle: string;
  @Input() listItemTitle: string;
  @Input() listItems: Array<Category> = [];

  selectedListItem: Category;

  constructor() {}

  ngOnInit(): void {
    this.selectedListItem = this.listItems[0];
  }

  public selectItem = (item: Category): void => {
    this.selectedListItem = item;
  };
}
