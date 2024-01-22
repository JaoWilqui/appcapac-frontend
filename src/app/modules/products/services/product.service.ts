import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpSuccess } from '../../../_shared/models/http-success.model';
import { IPaginationRes } from '../../../_shared/models/pagination.model';
import { IProduct } from '../../product/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getCategories(params: any): Observable<IPaginationRes<IProduct>> {
    return this.http.get<IPaginationRes<IProduct>>('/product', {
      params: { ...params },
    });
  }

  postProduct(product: IProduct): Observable<HttpSuccess> {
    return this.http.post<HttpSuccess>('/product/register', product);
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`/product/${id}`);
  }

  updateProduct(id: number, product: IProduct): Observable<HttpSuccess> {
    return this.http.put<HttpSuccess>(`/product/update/${id}`, product);
  }

  deleteProductById(id: number) {
    return this.http.delete<HttpSuccess>(`/product/delete/${id}`);
  }
}
