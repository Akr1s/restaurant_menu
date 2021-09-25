import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { dishMock } from '../constants/dataMocks';
import routes from '../constants/dishServiceRoutes';
import { RESPONSE_CODES } from '../constants/responseCodes';
import { Dish } from '../models/dish.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class DishesService {
  dishData = new BehaviorSubject<Dish[]>([dishMock]);

  constructor(private http: HttpClient) {
    this.getAllDishes();
  }

  private getAllDishes(): void {
    this.http.get<Dish[]>(routes.getAllDishes).subscribe((data: Dish[]) => {
      this.dishData.next(data);
    });
  }

  getDishesByCategoryId(id: string): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${routes.getDishesByCategoryId}${id}`);
  }

  async updateDish(dish: Dish, id: string): Promise<number> {
    let responseCode = RESPONSE_CODES.UPDATE_ERROR;
    dish.id = id;
    try {
      responseCode = await this.http
        .put<number>(routes.updateDish + id, dish)
        .toPromise();
      if (responseCode === RESPONSE_CODES.UPDATE_SUCCESS) {
        this.dishData.next(this.localDishListUpdate(dish, id));
      }
    } catch (error) {
      console.log(error);
    }
    return responseCode;
  }

  async addDish(dish: Dish): Promise<number> {
    let responseCode = RESPONSE_CODES.ADD_ERROR;
    dish.id = uuidv4();
    try {
      responseCode = await this.http
        .post<number>(routes.addDish, dish)
        .toPromise();
      if (responseCode === RESPONSE_CODES.ADD_SUCCESS) {
        this.dishData.next(this.localDishListAdd(dish));
      }
    } catch (error) {
      console.log(error);
    }
    return responseCode;
  }

  async deleteDish(id: string): Promise<number> {
    let responseCode = RESPONSE_CODES.DELETE_ERROR;
    try {
      responseCode = await this.http
        .delete<number>(routes.deleteDish + id)
        .toPromise();
      if (responseCode === RESPONSE_CODES.DELETE_SUCCESS) {
        this.dishData.next(this.localDishListDelete(id));
      }
    } catch (error) {
      console.log(error);
    }
    return responseCode;
  }

  localDishListUpdate(dish: Dish, id: string) {
    const list = [...this.dishData.value];
    const result = list.map((listItem: Dish): Dish => {
      if (listItem.id === id) {
        listItem = { ...listItem, ...dish };
      }
      return listItem;
    });
    return result;
  }

  localDishListAdd(dish: Dish) {
    const list = [...this.dishData.value];
    list.push(dish);
    return list;
  }

  localDishListDelete(id: string) {
    const list = [...this.dishData.value];
    const resultList = list.filter((dish: Dish) => dish.id !== id);
    return resultList;
  }
}
