import { Component, Input, OnInit } from '@angular/core';
import { Dish } from 'src/app/models/dish.model';

@Component({
  selector: 'app-dish-item',
  templateUrl: './dish-item.component.html',
  styleUrls: ['./dish-item.component.scss'],
})
export class DishItemComponent implements OnInit {
  @Input() dish: Dish;

  constructor() {}

  ngOnInit(): void {}
}
