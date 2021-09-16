import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}
  getCategories() {
    console.log('starting request');
    this.http
      .get<any>('http://localhost:3001/api/categories')
      .subscribe((response: any) => console.log('response: ', response));
  }
}
