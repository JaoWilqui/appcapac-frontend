import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getUserState } from '../../_store/user/user.selector';
import { IUserProfile } from '../../auth/models/auth.model';

@Injectable({ providedIn: 'root' })
export class ModuleGuard {
  profile: string;
  user: IUserProfile;
  constructor(private router: Router, private store: Store<any>) {
    this.store.select(getUserState).subscribe((user) => {
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
