import { Component, Input, OnInit } from '@angular/core';
import { Dish } from 'src/app/models/dish.model';

@Component({
  selector: 'dishes-editor',
  templateUrl: './dishes-editor.component.html',
  styleUrls: ['./dishes-editor.component.scss'],
})
export class DishesEditorComponent implements OnInit {
  @Input() listTitle: string;
  @Input() listItemTitle: string;
  @Input() listItems: Array<Dish>;

  selectedListItem: Dish;
  constructor() {}

  ngOnInit(): void {
    this.selectedListItem = this.listItems[0];
  }

  public selectItem = (item: Dish): void => {
    this.selectedListItem = item;
  };
}
