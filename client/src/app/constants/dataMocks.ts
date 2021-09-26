import { DishInterface } from '../interfaces/dish';
import { InfoInterface } from '../interfaces/info';

export const infoMock: InfoInterface = {
  id: 1,
  title: 'Restaurant',
  address: 'Unknown',
  tel: 'Unknown',
  wifi: 'Free',
};
export const dishMock: DishInterface = {
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
