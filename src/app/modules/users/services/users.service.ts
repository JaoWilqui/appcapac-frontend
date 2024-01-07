import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpSuccess } from '../../../_shared/models/http-success.model';
import { IPaginationRes } from '../../../_shared/models/pagination.model';
import { User } from '../../../_shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(params: any): Observable<any> {
    return this.http.get<IPaginationRes<User>>('/user', {
      params: { ...params },
    });
  }

  postUsers(user: User): Observable<HttpSuccess> {
    return this.http.post<HttpSuccess>('/user/register', user);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`/user/${id}`);
  }

  updateUser(id: number, user: User): Observable<HttpSuccess> {
    return this.http.put<HttpSuccess>(`/user/update/${id}`, user);
  }

  deleteUserById(id: number) {
    return this.http.delete<HttpSuccess>(`/user/delete/${id}`);
  }
}
