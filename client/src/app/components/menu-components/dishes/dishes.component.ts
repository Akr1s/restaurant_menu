import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
})
export class DishesComponent implements OnInit {
  @Input() selectedCategoryName: string;

  constructor() {}

  ngOnInit(): void {}
}
