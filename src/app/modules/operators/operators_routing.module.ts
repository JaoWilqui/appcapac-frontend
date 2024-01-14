import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperatorsComponent } from './operators.component';
import { ListOperatorsComponent } from './pages/list-operators/list-operators.component';
import { OperatorsRegisterComponent } from './pages/operators-register/operators-register.component';

const routes: Routes = [
  {
    path: '',
    component: OperatorsComponent,
    children: [
      {
        path: '',
        component: ListOperatorsComponent,
      },
      {
        path: 'register',
        component: OperatorsRegisterComponent,
      },
      {
        path: 'edit/:id',
        component: OperatorsRegisterComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperatorsRoutingModule {}
