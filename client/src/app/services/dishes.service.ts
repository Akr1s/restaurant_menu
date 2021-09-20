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
}
