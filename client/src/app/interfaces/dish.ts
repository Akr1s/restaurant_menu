import { WeightsInterface } from './weights';

export interface DishInterface {
  id: string;
  name: string;
  description: string;
  img: string;
  show: boolean;
  category: string;
  weights: WeightsInterface;
  created_date: string;
  updated_date: string;
}
