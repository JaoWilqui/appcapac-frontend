import { NgModule } from '@angular/core';

import { SharedModule } from '../../_shared/shared.module';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { UsersRegisterComponent } from './pages/users-register/users-register.component';
import { UserRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [UsersComponent, ListUsersComponent, UsersRegisterComponent],
  imports: [SharedModule, UserRoutingModule],
  providers: [],
})
export class UsersModule {}
