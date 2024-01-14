import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpSuccess } from '../../../_shared/models/http-success.model';
import { IPaginationRes } from '../../../_shared/models/pagination.model';
import { IOperator } from '../models/operators.model';

@Injectable({
  providedIn: 'root',
})
export class OperatorsService {
  constructor(private http: HttpClient) {}

  getOperators(params: any): Observable<IPaginationRes<IOperator>> {
    return this.http.get<IPaginationRes<IOperator>>('/operators', {
      params: { ...params },
    });
  }

  getOperatorById(id: number): Observable<IOperator> {
    return this.http.get<IOperator>(`/operators/${id}`, {});
  }

  postOperator(video: IOperator): Observable<HttpSuccess> {
    return this.http.post<HttpSuccess>('/operators/register', video);
  }

  updateOperator(id: number, video: IOperator): Observable<HttpSuccess> {
    return this.http.put<HttpSuccess>(`/operators/update/${id}`, video);
  }

  deleteOperatorsById(id: number) {
    return this.http.delete<HttpSuccess>(`/operators/delete/${id}`);
  }
}
