import { Component, Input, OnInit } from '@angular/core';
import { Dish } from 'src/models/dish.model';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
})
export class DishesComponent implements OnInit {
  @Input() selectedCategoryName: string;
  dishesList: Dish[] = [
    {
      id: 1,
      name: 'Borsch',
      description:
        'beets, cabbage, carrots, parsley, potatoes, onions, tomatoes',
      img: 'https://1.bp.blogspot.com/-JHaJvvv_fYg/YD0LydJz9kI/AAAAAAAAFs8/EARf7IDXhpIoOPOCAyxIEiMFtSyv445CwCLcBGAsYHQ/s700/PNGKH_00001082.png',
      show: true,
      category: 9,
      weights: { smoll: '100$', normal: '200$' },
    },
    {
      id: 2,
      name: 'Brine',
      description:
        'beef, onion, carrot, pickles, tomato paste, capers, green olives, sausages, smoked balyk, sugar, olive brine, butter, salt, pepper, paprika, bay leaf, herbs, lemon',
      img: 'https://1.bp.blogspot.com/-JHaJvvv_fYg/YD0LydJz9kI/AAAAAAAAFs8/EARf7IDXhpIoOPOCAyxIEiMFtSyv445CwCLcBGAsYHQ/s700/PNGKH_00001082.png',
      show: true,
      category: 9,
      weights: { smoll: '100$', normal: '200$' },
    },
    {
      id: 3,
      name: 'Water',
      description: '',
      img: 'https://1.bp.blogspot.com/-JHaJvvv_fYg/YD0LydJz9kI/AAAAAAAAFs8/EARf7IDXhpIoOPOCAyxIEiMFtSyv445CwCLcBGAsYHQ/s700/PNGKH_00001082.png',
      show: true,
      category: 11,
      weights: { smoll: '100$', normal: '200$' },
    },
    {
      id: 4,
      name: 'Gin',
      description: 'distilled grain alcohol, juniper berries',
      img: 'https://1.bp.blogspot.com/-JHaJvvv_fYg/YD0LydJz9kI/AAAAAAAAFs8/EARf7IDXhpIoOPOCAyxIEiMFtSyv445CwCLcBGAsYHQ/s700/PNGKH_00001082.png',
      show: true,
      category: 10,
      weights: { smoll: '100$', normal: '200$' },
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
