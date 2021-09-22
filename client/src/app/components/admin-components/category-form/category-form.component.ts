import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  @Input() cancelEditing: () => void;
  @Input() category: Category;
  constructor() {}

  ngOnInit(): void {}
}
