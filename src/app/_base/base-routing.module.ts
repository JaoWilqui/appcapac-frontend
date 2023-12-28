import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routeModules } from '../modules/routes';
import { BaseComponent } from './base.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: routeModules,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseRoutingModule {}
