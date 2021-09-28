import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import categoryAll from 'src/app/constants/categoryAll';
import { RESPONSE_CODES } from 'src/app/constants/responseCodes';
import { CategoryInterface } from 'src/app/interfaces/category';
import { PrimaryCategoryInterface } from 'src/app/interfaces/primaryCategory';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit, OnDestroy {
  @Input() cancelEditing: () => void;
  @Input() category: CategoryInterface;
  @Input() title: string;
  @Input() isAdding: boolean;
  @Input() isEditing: boolean;

  categoriesList: Array<PrimaryCategoryInterface>;
  selectValue: string | null = null;
  sub: Subscription;

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService
  ) {}

  categoryForm = this.fb.group({
    name: ['', [Validators.maxLength(30), Validators.required]],
    show: [false, Validators.required],
    parent: [null],
  });

  ngOnInit(): void {
    //filter
    this.sub = this.categoriesService.allPrimaryCategoriesData.subscribe(
      (data: PrimaryCategoryInterface[]) => {
        this.categoriesList = data.filter(
          (category: PrimaryCategoryInterface) =>
            category.name !== categoryAll.name
        );
      }
    );
    if (this.category) {
      this.pathFormData();
    }
  }

  async onSubmit() {
    if (this.isEditing) {
      const responseCode = await this.categoriesService.updateCategory(
        this.categoryForm.value,
        this.category.id
      );
      if (responseCode === RESPONSE_CODES.UPDATE_SUCCESS) {
        alert('Category updated');
        this.cancelEditing();
      }
    }
    if (this.isAdding) {
      const responseCode = await this.categoriesService.addCategory(
        this.categoryForm.value
      );
      if (responseCode === RESPONSE_CODES.ADD_SUCCESS) {
        alert('Category added');
        this.cancelEditing();
      }
    }
  }

  pathFormData() {
    this.categoryForm.patchValue({ ...this.category });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
