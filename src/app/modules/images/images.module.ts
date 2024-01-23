import { NgModule } from '@angular/core';
import { SharedModule } from '../../_shared/shared.module';
import { ImageViewComponent } from './components/image-view/image-view.component';
import { ImagesRoutingModule } from './images-routing.module';
import { ImagesComponent } from './images.component';
import { ImagesRegisterComponent } from './pages/images-register/images-register.component';
import { ListImagesComponent } from './pages/list-images/list-images.component';

@NgModule({
  imports: [SharedModule, ImagesRoutingModule],
  declarations: [
    ImagesComponent,
    ImagesRegisterComponent,
    ListImagesComponent,
    ImageViewComponent,
  ],
})
export class ImagesModule {}
