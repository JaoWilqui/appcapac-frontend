import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImagesComponent } from './images.component';
import { ImagesRegisterComponent } from './pages/images-register/images-register.component';
import { ListImagesComponent } from './pages/list-images/list-images.component';

const routes: Routes = [
  {
    path: '',
    component: ImagesComponent,
    children: [
      { path: '', component: ListImagesComponent },
      { path: 'register', component: ImagesRegisterComponent },
      { path: 'edit/:id', component: ImagesRegisterComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagesRoutingModule {}
