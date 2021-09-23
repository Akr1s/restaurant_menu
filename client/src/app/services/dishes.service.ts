import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import routes from '../constants/dishServiceRoutes';
import { Dish } from '../models/dish.model';

@Injectable({
  providedIn: 'root',
})
export class DishesService {
  constructor(private http: HttpClient) {}

  getDishesByCategoryId(id: string): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${routes.getDishesByCategoryId}${id}`);
  }

  getAllDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(routes.getAllDishes);
  }

  async updateDish(dish: Dish, id: string): Promise<number> {
    const responseCode = await this.http
      .put<number>(routes.updateDish + id, dish)
      .toPromise();
    return responseCode;
  }

  async addDish(dish: Dish): Promise<number> {
    const responseCode = await this.http
      .post<number>(routes.addDish, dish)
      .toPromise();
    return responseCode;
  }

  async deleteDish(id: string): Promise<number> {
    const responseCode = await this.http
      .delete<number>(routes.deleteDish + id)
      .toPromise();
    return responseCode;
  }
}
