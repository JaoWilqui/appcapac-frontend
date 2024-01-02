import { Order } from '../../../models/pagination.model';

export interface SortInterface {
  orderBy: string;
  orderDirection: Order;
}
