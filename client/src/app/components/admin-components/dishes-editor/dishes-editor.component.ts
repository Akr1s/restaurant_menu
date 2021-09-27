import { Component, Input, OnInit } from '@angular/core';
import { DishInterface } from 'src/app/interfaces/dish';
import { DishesService } from 'src/app/services/dishes.service';

@Component({
  selector: 'dishes-editor',
  templateUrl: './dishes-editor.component.html',
  styleUrls: ['./dishes-editor.component.scss'],
})
export class DishesEditorComponent implements OnInit {
  listTitle: string = 'Dishes list';
  listItemTitle: string = 'Dish';
  listItems: Array<DishInterface> = [];

  selectedListItem: DishInterface;

  isEditing: boolean = false;
  isAdding: boolean = false;

  constructor(private dishesService: DishesService) {}

  loadDishes() {
    this.dishesService.dishData.subscribe((data: DishInterface[]) => {
      this.listItems = data;
      this.selectedListItem = data[0];
    });
  }

  ngOnInit(): void {
    this.loadDishes();
  }

  public selectItem = (item: DishInterface): void => {
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
