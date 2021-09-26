import { Component } from '@angular/core';
import categoryAll from 'src/app/constants/categoryAll';
import { PrimaryCategoryInterface } from 'src/app/interfaces/primaryCategory';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class Menu {
  selectedCategory: PrimaryCategoryInterface = categoryAll;

  changeCategory(category: PrimaryCategoryInterface) {
    this.selectedCategory = category;
  }
}
