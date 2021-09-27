import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { DishInterface } from 'src/app/interfaces/dish';

@Component({
  selector: 'dishes-list-items',
  templateUrl: './dishes-list-items.component.html',
  styleUrls: ['./dishes-list-items.component.scss'],
})
export class DishesListItemsComponent implements OnInit {
  @Input() listItems: Array<DishInterface>;
  @Input() selectItem: (item: DishInterface) => void;
  @Input() selectedListItem: DishInterface;

  filteredList: Array<DishInterface>;

  constructor() {}

  ngOnInit(): void {
    this.filteredList = this.listItems;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.listItems && changes.listItems.currentValue) {
      this.filteredList = changes.listItems.currentValue;
    }
  }

  filterList(event: Event) {
    if (event.target) {
      const target = event.target as HTMLInputElement;
      this.filteredList = this.listItems.filter((item) =>
        item.name.toLocaleLowerCase().includes(target.value.toLocaleLowerCase())
      );
    }
  }
}
