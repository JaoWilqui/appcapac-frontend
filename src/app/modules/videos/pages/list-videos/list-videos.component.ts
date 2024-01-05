import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IVideos } from '../../models/videos.model';
import { VideosService } from '../../services/videos.service';

@Component({
  selector: 'app-list-videos',
  templateUrl: './list-videos.component.html',
  styleUrls: ['./list-videos.component.scss'],
})
export class ListVideosComponent implements OnInit {
  videos: IVideos[] = [];

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private videosService: VideosService
  ) {}

  ngOnInit() {
    this.loadVideos();
  }

  loadVideos() {
    this.videosService.getVideos({}).subscribe({
      next: (res) => {
        this.videos = res.data;
      },
    });
  }

  navigateTo(param: string, id?: number) {
    if (id) {
      this.router.navigate([param + '/' + `${id}`], {
        relativeTo: this.activeRoute,
      });
      return;
    }
    this.router.navigate([param], {
      relativeTo: this.activeRoute,
    });
  }
}
