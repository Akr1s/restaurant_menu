import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DishInterface } from 'src/app/interfaces/dish';
import { PrimaryCategoryInterface } from 'src/app/interfaces/primaryCategory';
import { DishesService } from 'src/app/services/dishes.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.scss'],
})
export class SingleCategoryComponent implements OnInit, OnChanges, OnDestroy {
  @Input() category: PrimaryCategoryInterface;
  @Input() allSelected: boolean;
  dishesList: DishInterface[] = [];
  loading: boolean = true;
  sub: Subscription;

  constructor(private dishesService: DishesService) {}

  getDishes(id: string) {
    this.loading = true;
    this.sub = this.dishesService
      .getDishesByCategoryId(id)
      .subscribe((data: DishInterface[]) => {
        this.dishesList = data;
        this.loading = false;
      });
  }

  ngOnInit(): void {
    this.getDishes(this.category.id);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getDishes(changes.category.currentValue.id);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
