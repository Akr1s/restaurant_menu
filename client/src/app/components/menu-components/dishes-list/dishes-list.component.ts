import { Component, Input, OnInit } from '@angular/core';
import { DishInterface } from 'src/app/interfaces/dish';

@Component({
  selector: 'app-dishes-list',
  templateUrl: './dishes-list.component.html',
  styleUrls: ['./dishes-list.component.scss'],
})
export class DishesListComponent implements OnInit {
  @Input() dishesList: DishInterface[];
  constructor() {}

  ngOnInit(): void {}
}
