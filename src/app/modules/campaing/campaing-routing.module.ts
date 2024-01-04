import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaingComponent } from './campaing.component';
import { CampaingRegisterComponent } from './pages/campaing-register/campaing-register.component';
import { ListCampaingsComponent } from './pages/list-campaings/list-campaings.component';

const routes: Routes = [
  {
    path: '',
    component: CampaingComponent,
    children: [
      { path: '', component: ListCampaingsComponent },
      { path: 'register', component: CampaingRegisterComponent },
      { path: 'edit/:id', component: CampaingRegisterComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaingRoutingModule {}
