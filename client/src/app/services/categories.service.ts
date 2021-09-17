import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import routes from '../constants/categoryServiceRoutes';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}
  getPrimaryCategories(): any {
    return this.http.get<any>(routes.getPrimaryCategories);
  }
}
