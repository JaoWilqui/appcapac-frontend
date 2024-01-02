import { Order } from './pagination.model';

export class IParams {
  page: number;
  pageCount: number;
  orderBy: string;
  order: Order = Order.ASC;
}
