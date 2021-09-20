import { Component, Input, OnInit } from '@angular/core';
import { Dish } from 'src/app/models/dish.model';

@Component({
  selector: 'dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.scss'],
})
export class DishDetailsComponent implements OnInit {
  @Input() listItemTitle: string;
  @Input() selectedListItem: Dish;
  constructor() {}

  ngOnInit(): void {}
}
