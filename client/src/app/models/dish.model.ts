import { Weights } from './weights.model';

export interface Dish {
  id: string;
  name: string;
  description: string;
  img: string;
  show: boolean;
  category: string;
  weights: Weights;
  created_date: string;
  updated_date: string;
}
