import { Component } from '@angular/core';
import categoryAll from 'src/app/constants/categoryAll';
import { PrimaryCategory } from 'src/app/models/primaryCategory.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class Menu {
  selectedCategory: PrimaryCategory = categoryAll;

  changeCategory(category: PrimaryCategory) {
    this.selectedCategory = category;
  }
}
