import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class InitializerService {
  constructor(private authService: AuthService) {}

  async getInfo() {
    let succesInitialization: boolean = true;

    await firstValueFrom(this.authService.getUserInfo())
      .then((res) => {
        succesInitialization = true;
      })
      .catch((error) => {
        succesInitialization = false;
      });

    return succesInitialization;
  }
}
