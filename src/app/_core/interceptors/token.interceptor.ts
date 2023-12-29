import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken') ?? '';

    request = request.clone({
      setHeaders: { Authorization: 'Bearer ' + token },
    });

    request = request.clone({ url: environment.apiUrl + request.url });

    return next.handle(request).pipe(
      catchError((error: HttpResponse<any>) => {
        if (error.status === 401) {
          this.authService.logout('login');
        }
        return throwError(() => error);
      })
    );
  }
}
