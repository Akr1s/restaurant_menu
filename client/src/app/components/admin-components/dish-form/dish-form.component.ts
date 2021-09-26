import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RESPONSE_CODES } from 'src/app/constants/responseCodes';
import { DishInterface } from 'src/app/interfaces/dish';
import { PrimaryCategoryInterface } from 'src/app/interfaces/primaryCategory';
import { WeightsInterface } from 'src/app/interfaces/weights';
import { CategoriesService } from 'src/app/services/categories.service';
import { DishesService } from 'src/app/services/dishes.service';

@Component({
  selector: 'dish-form',
  templateUrl: './dish-form.component.html',
  styleUrls: ['./dish-form.component.scss'],
})
export class DishFormComponent implements OnInit {
  @Input() cancelEditing: () => void;
  @Input() dish: DishInterface;
  @Input() title: string;
  @Input() isAdding: boolean;
  @Input() isEditing: boolean;

  categoriesList: Array<PrimaryCategoryInterface> = [];
  weightsArray: Array<string[]> = [];
  previewSource: string = '';

  constructor(
    private fb: FormBuilder,
    private dishesService: DishesService,
    private categoriesService: CategoriesService
  ) {}

  dishForm = this.fb.group({
    name: ['', [Validators.maxLength(30), Validators.required]],
    description: ['', Validators.required],
    img: ['', Validators.required],
    show: ['', Validators.required],
    category: ['', Validators.required],
    weights: this.fb.array([
      new FormGroup({
        portion: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required]),
      }),
    ]),
  });

  ngOnInit(): void {
    this.categoriesService.allNonPrimaryCategoriesData.subscribe(
      (data: PrimaryCategoryInterface[]) => {
        this.categoriesList = data;
      }
    );
    if (this.dish) {
      this.weightsArray = Object.entries(this.dish.weights);
      this.fillWeights(this.weightsArray.length);
      this.pathFormData();
      this.previewSource = this.dishForm.controls.img.value;
    }
    this.convertWeights();
  }

  fillWeights(count: number): void {
    for (let i = 0; i < count - 1; i++) {
      this.addWeight();
    }
  }

  get weights(): FormArray {
    return this.dishForm.controls['weights'] as FormArray;
  }

  addWeight(): void {
    const portion = new FormGroup({
      portion: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
    });
    this.weights.push(portion);
  }

  public deletePortion(portionIndex: number): void {
    this.weights.removeAt(portionIndex);
  }

  async onSubmit() {
    const form = this.dishForm;
    form.value.weights = this.convertWeights();
    form.value.img = this.previewSource;
    if (this.isEditing) {
      const responseCode = await this.dishesService.updateDish(
        form.value,
        this.dish.id
      );
      if (responseCode === RESPONSE_CODES.UPDATE_SUCCESS) {
        alert('Dish updated');
        this.cancelEditing();
      }
    }
    if (this.isAdding) {
      const responseCode = await this.dishesService.addDish(form.value);
      if (responseCode === RESPONSE_CODES.ADD_SUCCESS) {
        alert('Dish added');
        this.cancelEditing();
      }
    }
  }

  pathFormData() {
    let { name, description, img, show, category } = this.dish;
    this.pathWeights();
    this.dishForm.patchValue({
      name,
      description,
      img,
      show,
      category,
    });
  }

  public pathWeights = () => {
    const weightsValue = [];
    const count = this.weightsArray.length;
    for (let i = 0; i < count; i++) {
      weightsValue.push({
        portion: this.weightsArray[i][0],
        price: this.weightsArray[i][1],
      });
    }
    this.weights.setValue(weightsValue);
  };

  convertWeights(): WeightsInterface {
    const values = this.weights.value;
    const count = values.length;
    const result: any = {};
    for (let i = 0; i < count; i++) {
      const key: string = values[i]['portion'];
      const value: string = values[i]['price'];
      result[key] = value;
    }
    return result;
  }

  handleImageInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      const file: File = (target.files as FileList)[0];
      this.previewFile(file);
    }
  }

  previewFile(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.previewSource = reader.result as string;
    };
  }

  clearPreviewImage() {
    this.previewSource = '';
    this.dishForm.controls.img.setValue('');
  }
}
