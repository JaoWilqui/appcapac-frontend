import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UsersRegisterComponent } from './pages/users-register/users-register.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      { path: '', component: ListUsersComponent },
      { path: 'register', component: UsersRegisterComponent },
      { path: 'edit/:id', component: UsersRegisterComponent },
      {
        path: 'profile',
        component: UserProfileComponent,
        children: [
          { path: 'edit', component: EditProfileComponent },
          { path: 'change-password', component: ChangePasswordComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
