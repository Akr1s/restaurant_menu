import { Dish } from '../models/dish.model';
import { Info } from '../models/info.model';

export const infoMock: Info = {
  id: 1,
  title: 'Restaurant',
  address: 'Unknown',
  tel: 'Unknown',
  wifi: 'Free',
};
export const dishMock: Dish = {
  id: '1',
  name: 'Dish',
  description: 'Dummy text here',
  img: 'Unknown',
  show: true,
  category: '',
  weights: { normal: '200$' },
  created_date: 'now',
  updated_date: 'never',
};
