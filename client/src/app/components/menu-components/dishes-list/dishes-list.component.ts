import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DishInterface } from 'src/app/interfaces/dish';
import { PrimaryCategoryInterface } from 'src/app/interfaces/primaryCategory';
import { DishesService } from 'src/app/services/dishes.service';

@Component({
  selector: 'app-dishes-list',
  templateUrl: './dishes-list.component.html',
  styleUrls: ['./dishes-list.component.scss'],
})
export class DishesListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() category: PrimaryCategoryInterface;
  dishesList: DishInterface[] = [];
  loading: boolean = true;
  first: any;

  constructor(private dishesService: DishesService) {}

  getDishes(id: string) {
    this.loading = true;
    this.first = this.dishesService
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
    this.first.unsubscribe();
  }
}
