import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../../_shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class PermsGuard {
  profile: string;
  user: User;
  constructor(private router: Router, private store: Store<any>) {
    this.store.select('user').subscribe((user) => {
      this.user = user;
    });
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.user?.perms) {
      this.profile = this.user?.perms;
      return this.handleGuard(route);
    }
    return false;
  }
  handleGuard(route: ActivatedRouteSnapshot) {
    if (route.data['perms'].includes(this.profile)) {
      return true;
    } else {
      this.router.navigate(['/users/profile/edit']);
      return false;
    }
  }
}
