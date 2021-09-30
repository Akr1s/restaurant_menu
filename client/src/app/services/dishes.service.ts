import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import routes from '../constants/dishServiceRoutes';
import { RESPONSE_CODES } from '../constants/responseCodes';
import { DishInterface } from '../interfaces/dish';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class DishesService {
  dishData = new BehaviorSubject<Array<DishInterface>>([]);

  constructor(private http: HttpClient) {
    this.getAllDishes();
  }

  private getAllDishes(): void {
    this.http
      .get<DishInterface[]>(routes.getAllDishes)
      .subscribe((data: DishInterface[]) => {
        this.dishData.next(data);
      });
  }

  getDishesByCategoryId(id: string): Observable<DishInterface[]> {
    return this.http.get<DishInterface[]>(
      `${routes.getDishesByCategoryId}${id}`
    );
  }

  async updateDish(dish: DishInterface, id: string): Promise<number> {
    let responseCode = RESPONSE_CODES.UPDATE_ERROR;
    dish.id = id;
    try {
      responseCode = await this.http
        .put<number>(routes.updateDish + id, dish)
        .toPromise();
      if (responseCode === RESPONSE_CODES.UPDATE_SUCCESS) {
        this.dishData.next(this.localDishListUpdate(dish, id));
      }
    } catch (error: any) {
      if (error.error === RESPONSE_CODES.DUPLICATE_ENTITY) {
        alert('Name field should be unique!');
      } else {
        console.log(error);
      }
    }
    return responseCode;
  }

  async addDish(dish: DishInterface): Promise<number> {
    let responseCode = RESPONSE_CODES.ADD_ERROR;
    dish.id = uuidv4();
    try {
      responseCode = await this.http
        .post<number>(routes.addDish, dish)
        .toPromise();
      if (responseCode === RESPONSE_CODES.ADD_SUCCESS) {
        this.dishData.next(this.localDishListAdd(dish));
      }
    } catch (error: any) {
      if (error.error === RESPONSE_CODES.DUPLICATE_ENTITY) {
        alert('Name field should be unique!');
      } else {
        console.log(error);
      }
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

  localDishListUpdate(dish: DishInterface, id: string) {
    const list = [...this.dishData.value];
    const result = list.map((listItem: DishInterface): DishInterface => {
      if (listItem.id === id) {
        listItem = { ...listItem, ...dish };
      }
      return listItem;
    });
    return result;
  }

  localDishListAdd(dish: DishInterface) {
    const list = [...this.dishData.value];
    list.push(dish);
    return list;
  }

  localDishListDelete(id: string) {
    const list = [...this.dishData.value];
    const resultList = list.filter((dish: DishInterface) => dish.id !== id);
    return resultList;
  }
}
