import { Component, Input, OnInit } from '@angular/core';
import { Dish } from 'src/app/models/dish.model';
import { DishesService } from 'src/app/services/dishes.service';

@Component({
  selector: 'dishes-editor',
  templateUrl: './dishes-editor.component.html',
  styleUrls: ['./dishes-editor.component.scss'],
})
export class DishesEditorComponent implements OnInit {
  @Input() listTitle: string;
  @Input() listItemTitle: string;
  listItems: Array<Dish> = [];

  selectedListItem: Dish;

  isEditing: boolean = false;
  isAdding: boolean = false;

  constructor(private dishesService: DishesService) {}

  loadDishes() {
    this.dishesService.dishData.subscribe((data: Dish[]) => {
      this.listItems = data;
      this.selectedListItem = data[0];
    });
  }

  ngOnInit(): void {
    this.loadDishes();
  }

  public selectItem = (item: Dish): void => {
    this.selectedListItem = item;
  };

  enableAdding() {
    this.isAdding = true;
  }

  public enableEditing = () => {
    this.isEditing = true;
  };
  public cancelEditing = () => {
    this.isEditing = false;
  };
  public cancelAdding = () => {
    this.isAdding = false;
  };
}
