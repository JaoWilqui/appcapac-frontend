import { NgModule } from '@angular/core';

import { SharedModule } from '../../_shared/shared.module';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [UsersComponent, ListUsersComponent],
  imports: [SharedModule],
  providers: [],
})
export class UsersModule {}
