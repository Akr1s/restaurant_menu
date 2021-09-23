import { Category } from '../models/category.model';
import { Info } from '../models/info.model';
import { PrimaryCategory } from '../models/primaryCategory.model';

export const infoMock: Info = {
  id: 1,
  title: 'Restaurant',
  address: 'Unknown',
  tel: 'Unknown',
  wifi: 'Free',
};
export const categoryMock: Category = {
  id: '1',
  name: 'Category',
  show: true,
  parent: null,
  created_date: 'now',
  updated_date: 'never',
};
