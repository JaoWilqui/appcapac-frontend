import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../../../_shared/models/pagination.model';
import { IParams } from '../../../../_shared/models/params.model';
import { SwalService } from '../../../../_shared/services/swal.service';
import { IVideos } from '../../models/videos.model';
import { VideosService } from '../../services/videos.service';

@Component({
  selector: 'app-list-videos',
  templateUrl: './list-videos.component.html',
  styleUrls: ['./list-videos.component.scss'],
})
export class ListVideosComponent implements OnInit {
  pagination = { page: 1, pageCount: 10 };
  sortParams = { order: Order.DESC, orderBy: 'id' };
  isLoading: boolean = false;

  videos: IVideos[] = [];

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private videosService: VideosService,
    private swalService: SwalService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    const params: IParams = {
      ...this.pagination,
      ...this.sortParams,
    };

    this.videosService.getVideos(params).subscribe({
      next: (res) => {
        this.videos = res.data;
      },
    });
  }

  delete(id: number) {
    this.swalService.warning
      .fire({
        title: 'Aviso',
        text: `Deseja deletar o video ${id} ? Essa ação não pode ser desfeita!`,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        showCancelButton: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.videosService.deleteVideosById(id).subscribe({
            next: (res) => {
              this.swalService.success.fire('Sucesso', res.message);
              this.loadData();
            },
          });
        }
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
