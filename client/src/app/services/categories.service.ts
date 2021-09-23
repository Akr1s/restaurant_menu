import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import categoryServiceRoutes from '../constants/categoryServiceRoutes';
import routes from '../constants/categoryServiceRoutes';
import { Category } from '../models/category.model';
import { PrimaryCategory } from '../models/primaryCategory.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getPrimaryCategories(): Observable<PrimaryCategory[]> {
    return this.http.get<PrimaryCategory[]>(routes.getPrimaryCategories);
  }

  getSingleCategory(id: string): Observable<Category> {
    return this.http.get<Category>(routes.getCategoryById + `${id}`);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(routes.getAllCategories);
  }

  async updateCategory(category: Category, id: string): Promise<number> {
    const responseCode = await this.http
      .put<number>(categoryServiceRoutes.updateCategory + id, category)
      .toPromise();
    return responseCode;
  }

  async addCategory(category: Category): Promise<number> {
    const responseCode = await this.http
      .post<number>(categoryServiceRoutes.addCategory, category)
      .toPromise();
    return responseCode;
  }

  async deleteCategory(id: string): Promise<number> {
    const responseCode = await this.http
      .delete<number>(categoryServiceRoutes.deleteCategory + id)
      .toPromise();
    return responseCode;
  }
}
