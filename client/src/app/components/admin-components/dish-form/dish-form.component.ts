import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RESPONSE_CODES } from 'src/app/constants/responseCodes';
import { Dish } from 'src/app/models/dish.model';
import { DishesService } from 'src/app/services/dishes.service';

@Component({
  selector: 'dish-form',
  templateUrl: './dish-form.component.html',
  styleUrls: ['./dish-form.component.scss'],
})
export class DishFormComponent implements OnInit {
  @Input() cancelEditing: () => void;
  @Input() dish: Dish;
  @Input() title: string;
  @Input() isAdding: boolean;
  @Input() isEditing: boolean;

  constructor(private fb: FormBuilder, private dishesService: DishesService) {}

  dishForm = this.fb.group({
    name: ['', [Validators.maxLength(30), Validators.required]],
    description: ['', Validators.required],
    img: ['', Validators.required],
    show: ['', Validators.required],
    category: ['', Validators.required],
    weights: ['', Validators.required],
  });

  async onSubmit() {
    if (this.isEditing) {
      const responseCode = await this.dishesService.updateDish(
        this.dishForm.value,
        this.dish.id
      );
      if (responseCode === RESPONSE_CODES.UPDATE_SUCCESS) {
        alert('Category updated');
        this.cancelEditing();
      }
    }
    if (this.isAdding) {
      const responseCode = await this.dishesService.addDish(
        this.dishForm.value
      );
      console.log(responseCode);
      if (responseCode === RESPONSE_CODES.ADD_SUCCESS) {
        alert('Category added');
        this.cancelEditing();
      }
    }
  }

  pathFormData() {
    this.dishForm.patchValue({ ...this.dish });
  }

  ngOnInit(): void {
    if (this.dish) {
      this.pathFormData();
    }
  }
}
