import { Component, Input, OnInit } from '@angular/core';
import { PrimaryCategoryInterface } from 'src/app/interfaces/primaryCategory';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
})
export class DishesComponent implements OnInit {
  @Input() selectedCategory: PrimaryCategoryInterface;

  constructor() {}

  ngOnInit(): void {}
}
