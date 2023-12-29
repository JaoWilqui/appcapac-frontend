import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IAuthRes, ILogin, IUserProfile } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(login: ILogin): Observable<IAuthRes> {
    return this.http.post<IAuthRes>('/auth', login);
  }

  logout(path: string) {
    localStorage.removeItem('authToken');
    this.router.navigate([path]);
  }

  getUserInfo(): Observable<IUserProfile> {
    return this.http.get<IUserProfile>('/user/profile');
  }
}
