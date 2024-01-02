export class IPaginationRes<T> {
  data?: T[];
  page: number;
  itemCount?: number;
  pageCount: number;
  orderBy: string;
  order: Order = Order.ASC;
}
export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}
