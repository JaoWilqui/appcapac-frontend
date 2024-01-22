import { NgModule } from '@angular/core';
import { SharedModule } from '../../_shared/shared.module';
import { ListCategoriesComponent } from './pages/list-products/list-products.component';
import { ProductRegisterComponent } from './pages/product-register/product-register.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';

@NgModule({
  imports: [SharedModule, ProductRoutingModule],
  declarations: [
    ProductComponent,
    ListCategoriesComponent,
    ProductRegisterComponent,
  ],
})
export class ProductModule {}
