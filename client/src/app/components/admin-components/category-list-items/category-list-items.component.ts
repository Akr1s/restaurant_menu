import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'category-list-items',
  templateUrl: './category-list-items.component.html',
  styleUrls: ['./category-list-items.component.scss'],
})
export class CategoryItemsComponent implements OnInit {
  @Input() listTitle: string;
  @Input() listItems: Array<Category>;
  @Input() selectItem: (item: Category) => void;
  @Input() selectedListItem: Category;

  constructor() {}

  ngOnInit(): void {}
}
