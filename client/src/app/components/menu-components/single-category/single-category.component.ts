import { Component, OnInit } from '@angular/core';
import { PrimaryCategory } from 'src/models/primaryCategory.model';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.scss'],
})
export class SingleCategoryComponent implements OnInit {
  primaryCategoryList: PrimaryCategory[] = [
    { id: '', name: 'First courses' },
    { id: '', name: 'Beverages' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
