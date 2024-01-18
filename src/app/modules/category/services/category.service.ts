import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpSuccess } from '../../../_shared/models/http-success.model';
import { IPaginationRes } from '../../../_shared/models/pagination.model';
import { ICategory } from '../../category/models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories(params: any): Observable<IPaginationRes<ICategory>> {
    return this.http.get<IPaginationRes<ICategory>>('/category', {
      params: { ...params },
    });
  }

  postCategory(category: ICategory): Observable<HttpSuccess> {
    return this.http.post<HttpSuccess>('/category/register', category);
  }

  getCategoryById(id: number): Observable<ICategory> {
    return this.http.get<ICategory>(`/category/${id}`);
  }

  updateCategory(id: number, category: ICategory): Observable<HttpSuccess> {
    return this.http.put<HttpSuccess>(`/category/update/${id}`, category);
  }

  deleteCategoryById(id: number) {
    return this.http.delete<HttpSuccess>(`/category/delete/${id}`);
  }
}
