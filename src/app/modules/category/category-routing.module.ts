import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category.component';
import { CategoryRegisterComponent } from './pages/category-register/category-register.component';
import { ListCategoriesComponent } from './pages/list-categories/list-categories.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryComponent,
    children: [
      { path: '', component: ListCategoriesComponent },
      { path: 'register', component: CategoryRegisterComponent },
      { path: 'edit/:id', component: CategoryRegisterComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
