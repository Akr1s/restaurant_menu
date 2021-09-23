import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import categoryAll from '../constants/categoryAll';
import categoryServiceRoutes from '../constants/categoryServiceRoutes';
import routes from '../constants/categoryServiceRoutes';
import { categoryMock } from '../constants/dataMocks';
import { RESPONSE_CODES } from '../constants/responseCodes';
import { Category } from '../models/category.model';
import { PrimaryCategory } from '../models/primaryCategory.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  allCategoriesData = new BehaviorSubject<Category[]>([categoryMock]);
  allPrimaryCategoriesData = new BehaviorSubject<PrimaryCategory[]>([
    categoryAll,
  ]);

  constructor(private http: HttpClient) {
    this.getAllCategories();
    this.getPrimaryCategories();
  }

  private getAllCategories(): void {
    this.http
      .get<Category[]>(routes.getAllCategories)
      .subscribe((data: Category[]) => {
        this.allCategoriesData.next(data);
      });
  }

  private getPrimaryCategories(): void {
    this.http
      .get<PrimaryCategory[]>(routes.getPrimaryCategories)
      .subscribe((data: PrimaryCategory[]) => {
        this.allPrimaryCategoriesData.next(data);
      });
  }

  getSingleCategory(id: string): Observable<Category> {
    return this.http.get<Category>(routes.getCategoryById + `${id}`);
  }

  async updateCategory(category: Category, id: string): Promise<number> {
    const responseCode = await this.http
      .put<number>(categoryServiceRoutes.updateCategory + id, category)
      .toPromise();
    if (responseCode === RESPONSE_CODES.UPDATE_SUCCESS) {
      this.getAllCategories();
      this.getPrimaryCategories();
    }
    return responseCode;
  }

  async addCategory(category: Category): Promise<number> {
    const responseCode = await this.http
      .post<number>(categoryServiceRoutes.addCategory, category)
      .toPromise();
    if (responseCode === RESPONSE_CODES.ADD_SUCCESS) {
      this.getAllCategories();
      this.getPrimaryCategories();
    }
    return responseCode;
  }

  async deleteCategory(id: string): Promise<number> {
    const responseCode = await this.http
      .delete<number>(categoryServiceRoutes.deleteCategory + id)
      .toPromise();
    if (responseCode === RESPONSE_CODES.DELETE_SUCCESS) {
      this.getAllCategories();
      this.getPrimaryCategories();
    }
    return responseCode;
  }
}
