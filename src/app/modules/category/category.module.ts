import { NgModule } from '@angular/core';
import { SharedModule } from '../../_shared/shared.module';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { CategoryRegisterComponent } from './pages/category-register/category-register.component';
import { ListCategoriesComponent } from './pages/list-categories/list-categories.component';

@NgModule({
  imports: [SharedModule, CategoryRoutingModule],
  declarations: [
    CategoryComponent,
    ListCategoriesComponent,
    CategoryRegisterComponent,
  ],
})
export class CategoryModule {}
