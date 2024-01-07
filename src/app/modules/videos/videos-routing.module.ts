import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListVideosComponent } from './pages/list-videos/list-videos.component';
import { VideosRegisterComponent } from './pages/videos-register/videos-register.component';
import { VideosComponent } from './videos.component';

const routes: Routes = [
  {
    path: '',
    component: VideosComponent,
    children: [
      { path: '', component: ListVideosComponent },
      { path: 'register', component: VideosRegisterComponent },
      { path: 'edit/:id', component: VideosRegisterComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideosRoutingModule {}
