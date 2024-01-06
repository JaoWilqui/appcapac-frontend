import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IImages } from '../../../images/models/images.model';
import { ImagesService } from '../../../images/services/images.service';

@Component({
  selector: 'app-list-images',
  templateUrl: './list-images.component.html',
  styleUrls: ['./list-images.component.scss'],
})
export class ListImagesComponent implements OnInit {
  images: IImages[] = [];

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private imagesService: ImagesService
  ) {}

  ngOnInit() {
    this.loadImages();
  }

  loadImages() {
    this.imagesService.getImages({}).subscribe({
      next: (res) => {
        this.images = res.data;
        console.log(this.images);
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
