import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../../../_shared/models/pagination.model';
import { IParams } from '../../../../_shared/models/params.model';
import { SwalService } from '../../../../_shared/services/swal.service';
import { IImages } from '../../../images/models/images.model';
import { ImagesService } from '../../../images/services/images.service';

@Component({
  selector: 'app-list-images',
  templateUrl: './list-images.component.html',
  styleUrls: ['./list-images.component.scss'],
})
export class ListImagesComponent implements OnInit {
  pagination = { page: 1, pageCount: 10 };
  sortParams = { order: Order.DESC, orderBy: 'id' };
  isLoading: boolean = false;

  images: IImages[] = [];

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private imagesService: ImagesService,
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

    this.imagesService.getImages({}).subscribe({
      next: (res) => {
        this.images = res.data;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
      },
    });
  }

  delete(id: number) {
    this.swalService.warning
      .fire({
        title: 'Aviso',
        text: `Deseja deletar a imagem ${id} ? Essa ação não pode ser desfeita!`,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        showCancelButton: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.imagesService.deleteImagesById(id).subscribe({
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
