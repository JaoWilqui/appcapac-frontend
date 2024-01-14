import { NgModule } from '@angular/core';
import { SharedModule } from '../../_shared/shared.module';
import { OperatorsComponent } from './operators.component';
import { OperatorsRoutingModule } from './operators_routing.module';
import { ListOperatorsComponent } from './pages/list-operators/list-operators.component';
import { OperatorsRegisterComponent } from './pages/operators-register/operators-register.component';

@NgModule({
  imports: [OperatorsRoutingModule, SharedModule],
  declarations: [
    OperatorsComponent,
    ListOperatorsComponent,
    OperatorsRegisterComponent,
  ],
})
export class OperatorsModule {}
