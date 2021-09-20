import { Weights } from './weights.model';

export interface Dish {
  id: number;
  name: string;
  description: string;
  img: string;
  show: boolean;
  category: number;
  weights: Weights;
}
