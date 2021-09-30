import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import categoryAll from '../constants/categoryAll';
import categoryServiceRoutes from '../constants/categoryServiceRoutes';
import routes from '../constants/categoryServiceRoutes';
import { RESPONSE_CODES } from '../constants/responseCodes';
import { CategoryInterface } from '../interfaces/category';
import { PrimaryCategoryInterface } from '../interfaces/primaryCategory';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  allCategoriesData = new BehaviorSubject<Array<CategoryInterface>>([]);
  allPrimaryCategoriesData = new BehaviorSubject<
    Array<PrimaryCategoryInterface>
  >([]);
  allNonPrimaryCategoriesData = new BehaviorSubject<
    Array<PrimaryCategoryInterface>
  >([]);

  constructor(private http: HttpClient) {
    this.getAllCategories();
  }

  getPrimaryCategories(): Observable<PrimaryCategoryInterface[]> {
    return this.http.get<PrimaryCategoryInterface[]>(
      routes.getPrimaryCategories
    );
  }

  private getAllCategories(): void {
    this.http
      .get<CategoryInterface[]>(routes.getAllCategories)
      .subscribe((data: CategoryInterface[]) => {
        this.allCategoriesData.next(data);
        this.fillLists();
      });
  }

  getSingleCategory(id: string): CategoryInterface {
    const categories = [...this.allCategoriesData.value];
    return categories.filter(
      (category: CategoryInterface) => category.id === id
    )[0];
  }

  async updateCategory(
    category: CategoryInterface,
    id: string
  ): Promise<number> {
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
    } catch (error: any) {
      if (error.error === RESPONSE_CODES.DUPLICATE_ENTITY) {
        alert('Name field should be unique!');
      } else {
        console.log(error);
      }
    }
    return responseCode;
  }

  async addCategory(category: CategoryInterface): Promise<number> {
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
    } catch (error: any) {
      if (error.error === RESPONSE_CODES.DUPLICATE_ENTITY) {
        alert('Name field should be unique!');
      } else {
        console.log(error);
      }
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

  filterCategory(isPrimary: boolean): PrimaryCategoryInterface[] {
    const categories = [...this.allCategoriesData.value];
    const resultList = categories.filter(
      (category: CategoryInterface) =>
        typeof category.parent === (isPrimary ? 'object' : 'string')
    );
    return resultList.map((category: CategoryInterface) => ({
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

  localCategoryListUpdate(category: CategoryInterface, id: string) {
    const list = [...this.allCategoriesData.value];
    const result = list.map(
      (listItem: CategoryInterface): CategoryInterface => {
        if (listItem.id === id) {
          listItem = { ...listItem, ...category };
        }
        return listItem;
      }
    );
    return result;
  }

  localCategoryListAdd(category: CategoryInterface) {
    const list = [...this.allCategoriesData.value];
    list.push(category);
    return list;
  }

  localCategoryListDelete(id: string) {
    const list = [...this.allCategoriesData.value];
    const resultList = list.filter(
      (category: CategoryInterface) => category.id !== id
    );
    return resultList;
  }
}
