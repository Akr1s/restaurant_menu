import { Component, Input, OnInit } from '@angular/core';
import { PrimaryCategory } from 'src/app/models/primaryCategory.model';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
})
export class DishesComponent implements OnInit {
  @Input() selectedCategory: PrimaryCategory;

  constructor() {}

  ngOnInit(): void {}
}
