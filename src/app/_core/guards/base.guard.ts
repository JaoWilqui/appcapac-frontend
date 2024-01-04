import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BaseGuard {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('authToken')) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
