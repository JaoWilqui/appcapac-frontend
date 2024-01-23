import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImagesComponent } from './images.component';
import { ListImagesComponent } from './pages/list-images/list-images.component';

const routes: Routes = [
  {
    path: '',
    component: ImagesComponent,
    children: [{ path: '', component: ListImagesComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagesRoutingModule {}
