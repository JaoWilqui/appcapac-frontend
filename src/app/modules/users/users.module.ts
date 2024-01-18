import { NgModule } from '@angular/core';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { SharedModule } from '../../_shared/shared.module';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UsersRegisterComponent } from './pages/users-register/users-register.component';
import { UserRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [
    UsersComponent,
    ListUsersComponent,
    UsersRegisterComponent,
    UserProfileComponent,
  ],
  imports: [SharedModule, UserRoutingModule, NgxMaskDirective, NgxMaskPipe],

  providers: [provideNgxMask()],
})
export class UsersModule {}
