import { Component, OnInit } from '@angular/core';
import { Category } from 'src/models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  primaryCategoriesList: Category[] = [
    { name: 'All' },
    { name: 'First courses' },
    { name: 'Beverages' },
    { name: 'All' },
    { name: 'First courses' },
    { name: 'Beverages' },
    { name: 'All' },
    { name: 'First courses' },
    { name: 'Beverages' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
