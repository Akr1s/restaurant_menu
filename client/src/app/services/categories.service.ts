import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import routes from '../constants/categoryServiceRoutes';
import { PrimaryCategory } from '../models/primaryCategory.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getPrimaryCategories(): Observable<PrimaryCategory[]> {
    return this.http.get<PrimaryCategory[]>(routes.getPrimaryCategories);
  }
}
