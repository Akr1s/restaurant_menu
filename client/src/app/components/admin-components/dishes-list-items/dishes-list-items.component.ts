import { Component, Input, OnInit } from '@angular/core';
import { Dish } from 'src/app/models/dish.model';

@Component({
  selector: 'dishes-list-items',
  templateUrl: './dishes-list-items.component.html',
  styleUrls: ['./dishes-list-items.component.scss'],
})
export class DishesListItemsComponent implements OnInit {
  @Input() listItems: Array<Dish>;
  @Input() selectItem: (item: Dish) => void;
  @Input() selectedListItem: Dish;

  filteredList: Array<Dish>;

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
