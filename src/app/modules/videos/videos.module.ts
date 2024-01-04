import { NgModule } from '@angular/core';

import { SharedModule } from '../../_shared/shared.module';
import { ListVideosComponent } from './pages/list-videos/list-videos.component';
import { VideosRoutingModule } from './videos-routing.module';
import { VideosComponent } from './videos.component';

@NgModule({
  declarations: [ListVideosComponent, VideosComponent],
  imports: [SharedModule, VideosRoutingModule],
  providers: [],
})
export class VideosModule {}
