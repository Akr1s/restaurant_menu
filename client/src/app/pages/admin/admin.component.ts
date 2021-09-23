import { Component } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { Dish } from 'src/app/models/dish.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class Admin {
  dishesList: Array<Dish> = [
    {
      id: '519530cc-8125-4fbe-847c-8bdb79a4155c',
      name: 'random name two',
      description: 'random description',
      img: 'https://picsum.photos/id/237/200/300',
      show: true,
      category: '86018032-dfe6-44fc-8b7d-8c4048fe5d99',
      weights: { normal: '200$' },
      created_date: '2021-09-14T21:00:00.000Z',
      updated_date: '2021-09-14T21:00:00.000Z',
    },
    {
      id: '8e16530f-9e2f-4c38-bffe-00ab967cf8b2',
      name: 'random name final two',
      description: 'random description',
      img: 'https://picsum.photos/id/237/200/300',
      show: true,
      category: '86018032-dfe6-44fc-8b7d-8c4048fe5d99',
      weights: { normal: '200$' },
      created_date: '2021-09-14T21:00:00.000Z',
      updated_date: '2021-09-14T21:00:00.000Z',
    },
    {
      id: '8d0cacdd-b9f3-4fbd-9978-7492f623ea56',
      name: 'random name two',
      description: 'random description',
      img: 'https://picsum.photos/id/27/200/300',
      show: true,
      category: '182c4516-0437-48cb-9521-381cdcf7e020',
      weights: { normal: '200$' },
      created_date: '2021-09-14T21:00:00.000Z',
      updated_date: '2021-09-14T21:00:00.000Z',
    },
    {
      id: '206abe54-afac-4cd2-9b18-e31cf738a744',
      name: 'random name three',
      description: 'random description',
      img: 'https://picsum.photos/id/27/200/300',
      show: true,
      category: '182c4516-0437-48cb-9521-381cdcf7e020',
      weights: { normal: '200$' },
      created_date: '2021-09-14T21:00:00.000Z',
      updated_date: '2021-09-14T21:00:00.000Z',
    },
  ];
}
