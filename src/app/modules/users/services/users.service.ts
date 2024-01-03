import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  postUsers(user: User): Observable<any> {
    return this.http.post<User>('/user/register', user);
  }
}
