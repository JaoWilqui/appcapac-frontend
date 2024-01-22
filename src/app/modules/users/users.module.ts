import { NgModule } from '@angular/core';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { SharedModule } from '../../_shared/shared.module';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UsersRegisterComponent } from './pages/users-register/users-register.component';
import { UserRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [
    UsersComponent,
    EditProfileComponent,
    ListUsersComponent,
    UsersRegisterComponent,
    ChangePasswordComponent,
    UserProfileComponent,
  ],
  imports: [SharedModule, UserRoutingModule, NgxMaskDirective, NgxMaskPipe],

  providers: [provideNgxMask()],
})
export class UsersModule {}
