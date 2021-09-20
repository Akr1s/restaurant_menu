import { Component, Input, OnInit } from '@angular/core';
import { Dish } from 'src/app/models/dish.model';

@Component({
  selector: 'dishes-list-items',
  templateUrl: './dishes-list-items.component.html',
  styleUrls: ['./dishes-list-items.component.scss'],
})
export class DishesListItemsComponent implements OnInit {
  @Input() listTitle: string;
  @Input() listItems: Array<Dish>;
  @Input() selectItem: (item: Dish) => void;
  @Input() selectedListItem: Dish;

  constructor() {}

  ngOnInit(): void {}
}
