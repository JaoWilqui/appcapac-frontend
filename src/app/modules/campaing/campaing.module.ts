import { NgModule } from '@angular/core';
import { SharedModule } from '../../_shared/shared.module';
import { CampaingRoutingModule } from './campaing-routing.module';
import { CampaingComponent } from './campaing.component';
import { CampaingRegisterComponent } from './pages/campaing-register/campaing-register.component';
import { ListCampaingsComponent } from './pages/list-campaings/list-campaings.component';

@NgModule({
  imports: [SharedModule, CampaingRoutingModule],
  declarations: [
    CampaingComponent,
    ListCampaingsComponent,
    CampaingRegisterComponent,
  ],
})
export class CampaingModule {}
