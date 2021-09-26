import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CategoryInterface } from 'src/app/interfaces/category';

@Component({
  selector: 'category-list-items',
  templateUrl: './category-list-items.component.html',
  styleUrls: ['./category-list-items.component.scss'],
})
export class CategoryItemsComponent implements OnInit, OnChanges {
  @Input() listItems: Array<CategoryInterface>;
  @Input() selectItem: (item: CategoryInterface) => void;
  @Input() selectedListItem: CategoryInterface;

  filteredList: Array<CategoryInterface>;

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
        item.name.includes(target.value)
      );
    }
  }
}
