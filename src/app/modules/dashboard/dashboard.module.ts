import { NgModule } from '@angular/core';

import { SharedModule } from '../../_shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [DashboardComponent, HomeComponent],
  imports: [SharedModule, DashboardRoutingModule],
  providers: [],
})
export class DashboardModule {}
