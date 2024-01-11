import { NgModule } from '@angular/core';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { SharedModule } from '../_shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { AuthFooterComponent } from './components/auth-footer/auth-footer.component';
import { AuthHeaderComponent } from './components/auth-header/auth-header.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginFormComponent,
    LoginComponent,
    AuthFooterComponent,
    AuthHeaderComponent,
  ],
  imports: [AuthRoutingModule, SharedModule, NgxMaskDirective, NgxMaskPipe],

  providers: [provideNgxMask()],
})
export class AuthModule {}
