import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import categoryAll from '../constants/categoryAll';
import categoryServiceRoutes from '../constants/categoryServiceRoutes';
import routes from '../constants/categoryServiceRoutes';
import { RESPONSE_CODES } from '../constants/responseCodes';
import { Category } from '../models/category.model';
import { PrimaryCategory } from '../models/primaryCategory.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  allCategoriesData = new BehaviorSubject<Array<Category>>([]);
  allPrimaryCategoriesData = new BehaviorSubject<Array<PrimaryCategory>>([]);
  allNonPrimaryCategoriesData = new BehaviorSubject<Array<PrimaryCategory>>([]);

  constructor(private http: HttpClient) {
    this.getAllCategories();
  }

  getPrimaryCategories(): Observable<PrimaryCategory[]> {
    return this.http.get<PrimaryCategory[]>(routes.getPrimaryCategories);
  }

  private getAllCategories(): void {
    this.http
      .get<Category[]>(routes.getAllCategories)
      .subscribe((data: Category[]) => {
        this.allCategoriesData.next(data);
        this.fillLists();
      });
  }

  getSingleCategory(id: string): any {
    const categories = [...this.allCategoriesData.value];
    return categories.filter((category: Category) => category.id === id)[0];
  }

  async updateCategory(category: Category, id: string): Promise<number> {
    let responseCode = RESPONSE_CODES.UPDATE_ERROR;
    category.id = id;
    try {
      responseCode = await this.http
        .put<number>(categoryServiceRoutes.updateCategory + id, category)
        .toPromise();
      if (responseCode === RESPONSE_CODES.UPDATE_SUCCESS) {
        this.allCategoriesData.next(this.localCategoryListUpdate(category, id));
        this.fillLists();
      }
    } catch (error) {
      console.log(error);
    }
    return responseCode;
  }

  async addCategory(category: Category): Promise<number> {
    let responseCode = RESPONSE_CODES.ADD_ERROR;
    category.id = uuidv4();
    try {
      responseCode = await this.http
        .post<number>(categoryServiceRoutes.addCategory, category)
        .toPromise();
      if (responseCode === RESPONSE_CODES.ADD_SUCCESS) {
        this.allCategoriesData.next(this.localCategoryListAdd(category));
        this.fillLists();
      }
    } catch (error) {
      console.log(error);
    }
    return responseCode;
  }

  async deleteCategory(id: string): Promise<number> {
    let responseCode = RESPONSE_CODES.DELETE_ERROR;
    try {
      responseCode = await this.http
        .delete<number>(categoryServiceRoutes.deleteCategory + id)
        .toPromise();
      if (responseCode === RESPONSE_CODES.DELETE_SUCCESS) {
        this.allCategoriesData.next(this.localCategoryListDelete(id));
        this.fillLists();
      }
    } catch (error) {
      if (RESPONSE_CODES.DELETE_ERROR) {
        alert(
          'Cannot delete category with dishes. Delete all dishes from this category first!'
        );
      }
    }
    return responseCode;
  }

  filterCategory(isPrimary: boolean): PrimaryCategory[] {
    const categories = [...this.allCategoriesData.value];
    const resultList = categories.filter(
      (category: Category) =>
        typeof category.parent === (isPrimary ? 'object' : 'string')
    );
    return resultList.map((category: Category) => ({
      id: category.id,
      name: category.name,
    }));
  }

  fillLists(): void {
    this.allPrimaryCategoriesData.next([
      categoryAll,
      ...this.filterCategory(true),
    ]);
    this.allNonPrimaryCategoriesData.next(this.filterCategory(false));
  }

  localCategoryListUpdate(category: Category, id: string) {
    const list = [...this.allCategoriesData.value];
    const result = list.map((listItem: Category): Category => {
      if (listItem.id === id) {
        listItem = { ...listItem, ...category };
      }
      return listItem;
    });
    return result;
  }

  localCategoryListAdd(category: Category) {
    const list = [...this.allCategoriesData.value];
    list.push(category);
    return list;
  }

  localCategoryListDelete(id: string) {
    const list = [...this.allCategoriesData.value];
    const resultList = list.filter((category: Category) => category.id !== id);
    return resultList;
  }
}
