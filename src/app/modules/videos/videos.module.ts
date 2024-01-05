import { NgModule } from '@angular/core';

import { SharedModule } from '../../_shared/shared.module';
import { ListVideosComponent } from './pages/list-videos/list-videos.component';
import { VideosRegisterComponent } from './pages/videos-register/videos-register.component';
import { VideosRoutingModule } from './videos-routing.module';
import { VideosComponent } from './videos.component';

@NgModule({
  declarations: [ListVideosComponent, VideosComponent, VideosRegisterComponent],
  imports: [SharedModule, VideosRoutingModule],
  providers: [],
})
export class VideosModule {}
