import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { setUser } from '../_store/user/user.actions';
import { IUserProfile } from '../auth/models/auth.model';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class InitializerService {
  constructor(
    private authService: AuthService,
    private store: Store<IUserProfile>
  ) {}

  async getInfo() {
    const req = await firstValueFrom(this.authService.getUserInfo())
      .then((res) => {
        this.store.dispatch(setUser({ user: res }));
      })
      .catch((error) => {
        this.authService.logout('login');
      });

    return req;
  }
}
