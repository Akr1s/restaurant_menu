import { Component } from '@angular/core';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class Admin {
  categoriesList: Array<Category> = [
    {
      id: '618f10c7-f470-42e6-b89c-f0c0faeaa07f',
      name: 'Drinks',
      show: true,
      parent: null,
      created_date: '2021-09-13T21:00:00.000Z',
      updated_date: '2021-09-13T21:00:00.000Z',
    },
    {
      id: '7eeb634a-61ba-46f0-af40-a757fefab63e',
      name: 'Favourite',
      show: true,
      parent: null,
      created_date: '2021-09-14T21:00:00.000Z',
      updated_date: '2021-09-14T21:00:00.000Z',
    },
    {
      id: '86018032-dfe6-44fc-8b7d-8c4048fe5d99',
      name: 'Soft drinks',
      show: true,
      parent: '618f10c7-f470-42e6-b89c-f0c0faeaa07f',
      created_date: '2021-09-16T21:00:00.000Z',
      updated_date: '2021-09-16T21:00:00.000Z',
    },
    {
      id: '182c4516-0437-48cb-9521-381cdcf7e020',
      name: 'snacks',
      show: true,
      parent: '7eeb634a-61ba-46f0-af40-a757fefab63e',
      created_date: '2021-09-16T21:00:00.000Z',
      updated_date: '2021-09-16T21:00:00.000Z',
    },
    {
      id: '069acaea-615f-4aa1-851d-72c4dcb6134f',
      name: 'random',
      show: true,
      parent: '7eeb634a-61ba-46f0-af40-a757fefab63e',
      created_date: '2021-09-14T21:00:00.000Z',
      updated_date: '2021-09-14T21:00:00.000Z',
    },
  ];
}
