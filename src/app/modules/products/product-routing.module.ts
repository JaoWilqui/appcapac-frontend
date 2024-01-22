import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategoriesComponent } from './pages/list-products/list-products.component';
import { ProductRegisterComponent } from './pages/product-register/product-register.component';
import { ProductComponent } from './product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      { path: '', component: ListCategoriesComponent },
      { path: 'register', component: ProductRegisterComponent },
      { path: 'edit/:id', component: ProductRegisterComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
