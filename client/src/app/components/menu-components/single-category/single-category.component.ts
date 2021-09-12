import { Component, OnInit } from '@angular/core';
import { Category } from 'src/models/category.model';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.scss'],
})
export class SingleCategoryComponent implements OnInit {
  primaryCategoryList: Category[] = [
    { name: 'First courses' },
    { name: 'Beverages' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
