import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'category-list-items',
  templateUrl: './category-list-items.component.html',
  styleUrls: ['./category-list-items.component.scss'],
})
export class CategoryItemsComponent implements OnInit {
  @Input() listItems: Array<Category>;
  @Input() selectItem: (item: Category) => void;
  @Input() selectedListItem: Category;

  filteredList: Array<Category>;

  constructor() {}

  ngOnInit(): void {
    this.filteredList = this.listItems;
  }

  filterList(event: Event) {
    if (event.target) {
      const target = event.target as HTMLInputElement;
      this.filteredList = this.listItems.filter((item) =>
        item.name.includes(target.value)
      );
    }
  }
}
