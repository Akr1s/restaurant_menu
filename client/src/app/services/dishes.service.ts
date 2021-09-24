import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { dishMock } from '../constants/dataMocks';
import routes from '../constants/dishServiceRoutes';
import { RESPONSE_CODES } from '../constants/responseCodes';
import { Dish } from '../models/dish.model';

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
    try {
      responseCode = await this.http
        .put<number>(routes.updateDish + id, dish)
        .toPromise();
      if (responseCode === RESPONSE_CODES.UPDATE_SUCCESS) {
        this.getAllDishes();
      }
    } catch (error) {
      console.log(error);
    }
    return responseCode;
  }

  async addDish(dish: Dish): Promise<number> {
    let responseCode = RESPONSE_CODES.ADD_ERROR;
    try {
      responseCode = await this.http
        .post<number>(routes.addDish, dish)
        .toPromise();
      if (responseCode === RESPONSE_CODES.ADD_SUCCESS) {
        this.getAllDishes();
      }
    } catch (error) {
      console.log(error);
    }
    return responseCode;
  }

  async deleteDish(id: string): Promise<number> {
    const responseCode = await this.http
      .delete<number>(routes.deleteDish + id)
      .toPromise();
    if (responseCode === RESPONSE_CODES.DELETE_SUCCESS) {
      this.getAllDishes();
    }
    return responseCode;
  }
}
