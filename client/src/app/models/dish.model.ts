import { Weights } from './weights.model';

export class Dish {
  id: number;
  name: string;
  description: string;
  img: string;
  show: boolean;
  category: number;
  weights: Weights;
}
