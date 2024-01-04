import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListVideosComponent } from './pages/list-videos/list-videos.component';
import { VideosComponent } from './videos.component';

const routes: Routes = [
  {
    path: '',
    component: VideosComponent,
    children: [{ path: '', component: ListVideosComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideosRoutingModule {}
