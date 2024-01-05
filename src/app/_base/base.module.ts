import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../_shared/shared.module';
import { BaseRoutingModule } from './base-routing.module';
import { BaseComponent } from './base.component';
import { AsideComponent } from './components/aside/aside.component';
import { AsideMenuService } from './components/aside/services/aside-menu.service';
import { HeaderComponent } from './components/header/header.component';
import { SideLogoComponent } from './components/side-logo/side-logo.component';
import { UserInnerComponent } from './components/user-inner/user-inner.component';

@NgModule({
  declarations: [
    BaseComponent,
    AsideComponent,
    SideLogoComponent,
    UserInnerComponent,
    HeaderComponent,
  ],
  providers: [AsideMenuService],
  imports: [SharedModule, CommonModule, BaseRoutingModule, MatIconModule],
  exports: [RouterModule],
})
export class BaseModule {}
