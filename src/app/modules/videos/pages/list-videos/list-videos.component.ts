import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ControlTypeEnum } from '../../../../_shared/components/filter/enum/control-type.enum';
import { FiltersFields } from '../../../../_shared/components/filter/interface/filter-interface.model';
import { PaginatorEvent } from '../../../../_shared/components/paginator/models/page-event.model';
import { SortInterface } from '../../../../_shared/components/table/interface/sort.model';
import { Order } from '../../../../_shared/models/pagination.model';
import { IParams } from '../../../../_shared/models/params.model';
import { brlStates } from '../../../../_shared/models/states.model';
import { SwalService } from '../../../../_shared/services/swal.service';
import { ICampaing } from '../../../campaing/models/campaing.model';
import { OperatorsService } from '../../../operators/services/operators.service';
import { IProduct } from '../../../products/models/product.model';
import { ProductService } from '../../../products/services/product.service';
import { IVideos } from '../../models/videos.model';
import { VideosService } from '../../services/videos.service';
import { VideosRegisterComponent } from '../videos-register/videos-register.component';

@Component({
  selector: 'app-list-videos',
  templateUrl: './list-videos.component.html',
  styleUrls: ['./list-videos.component.scss'],
})
export class ListVideosComponent implements OnInit {
  pagination = { page: 1, pageCount: 6 };
  sortParams = { order: Order.DESC, orderBy: 'id' };
  isLoading: boolean = false;
  filterForm: FormGroup;
  itemsCount: number = 0;
  showFilters: boolean = false;
  campaings: ICampaing[] = [];
  products: IProduct[] = [];
  length: number;
  videos: IVideos[] = [];

  filterControls: FiltersFields[] = [
    {
      control: new FormControl(''),
      name: 'nome',
      label: 'Nome',
      type: ControlTypeEnum.FORM,
    },
    {
      control: new FormControl(''),
      name: 'cidade',
      label: 'Cidade',
      type: ControlTypeEnum.FORM,
    },
    {
      control: new FormControl(''),
      name: 'descricao',
      label: 'Descricao',
      type: ControlTypeEnum.FORM,
    },

    {
      label: 'Data de cadastro',
      control: new FormControl(null),
      name: 'dtcadastro',
      type: ControlTypeEnum.DATE_PICKER,
    },
    {
      control: new FormControl(''),
      name: 'uf',
      label: 'Estado',
      optionKey: 'nome',
      valueKey: 'sigla',
      options: brlStates,
      type: ControlTypeEnum.SELECT,
    },
    {
      control: new FormControl(''),
      name: 'operator',
      label: 'Operadora',
      optionKey: 'nome',
      valueKey: 'id',
      options: [],
      type: ControlTypeEnum.SELECT,
    },
    {
      control: new FormControl(''),
      name: 'product',
      label: 'Produto',
      optionKey: 'nome',
      valueKey: 'id',
      options: [],
      type: ControlTypeEnum.SELECT,
    },
  ];

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private videosService: VideosService,
    private swalService: SwalService,
    private productService: ProductService,
    private operatorsService: OperatorsService,
    private dialog: MatDialog
  ) {}

  register(): void {
    const dialogRef = this.dialog.open(VideosRegisterComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadData();
    });
  }

  edit(id: number) {
    const dialogRef = this.dialog.open(VideosRegisterComponent, {
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadData();
    });
  }

  ngOnInit() {
    this.getOperators();
    this.getProducts();
    this.loadData();
  }

  async getOperators() {
    const res = await firstValueFrom(this.operatorsService.getOperators({}));
    this.filterControls.forEach((value) => {
      if (value.name === 'operator') {
        value.options = res.data;
      }
    });
  }

  async getProducts() {
    const res = await firstValueFrom(this.productService.getProducts({}));
    this.filterControls.forEach((value) => {
      if (value.name === 'product') {
        value.options = res.data;
      }
    });
  }

  loadData() {
    this.isLoading = true;

    const filters = this.getFilters();

    const params: IParams = {
      ...filters,
      ...this.pagination,
      ...this.sortParams,
    };

    this.videosService.getVideos(params).subscribe({
      next: (res) => {
        this.videos = res.data;
        this.itemsCount = res.itemCount;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.swalService.error.fire('Error', error.message);
        this.isLoading = false;
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

  getFilters() {
    let filters = {};
    if (this.filterForm) {
      filters = this.filterForm.value;

      if (filters['dtcadastro']) {
        filters['dtcadastro'] = new Date(filters['dtcadastro']).toISOString();
      }

      Object.keys(filters).forEach((key) => {
        if (!filters[key]) {
          delete filters[key];
        }
      });
    }

    return filters;
  }

  changePage(event: PaginatorEvent) {
    (this.pagination = {
      page: event.pageIndex,
      pageCount: event.pageSize,
    }),
      this.loadData();
  }

  submitFilters(formGroup: FormGroup) {
    this.filterForm = formGroup;
    this.pagination.page = 1;
    this.loadData();
  }

  clearFilters(formGroup: FormGroup) {
    this.filterForm = formGroup;
    this.loadData();
  }

  sortTable(sort: SortInterface) {
    this.sortParams = {
      order: sort.orderDirection ?? Order.DESC,
      orderBy: sort.orderBy,
    };
    this.loadData();
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
