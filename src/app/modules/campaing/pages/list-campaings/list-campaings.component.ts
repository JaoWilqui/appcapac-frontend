import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatorEvent } from '../../../../_shared/components/paginator/models/page-event.model';
import { SortInterface } from '../../../../_shared/components/table/interface/sort.model';
import { Fields } from '../../../../_shared/components/table/interface/tableColumn.interface';
import { Order } from '../../../../_shared/models/pagination.model';
import { IParams } from '../../../../_shared/models/params.model';
import { SwalService } from '../../../../_shared/services/swal.service';
import { ICampaing } from '../../models/campaing.model';
import { CampaingService } from '../../services/campaing.service';

@Component({
  selector: 'app-list-campaings',
  templateUrl: './list-campaings.component.html',
  styleUrls: ['./list-campaings.component.scss'],
})
export class ListCampaingsComponent implements OnInit {
  pagination = { page: 1, pageCount: 10 };
  sortParams = { order: Order.DESC, orderBy: 'id' };
  data: ICampaing[] = [];

  isLoading: boolean = false;

  itemsCount: number = 0;
  displayedColumns: Fields[] = [
    {
      name: 'Id',
      dataKey: 'id',
      isSortable: true,
    },
    {
      name: 'Nome',
      dataKey: 'nome',
      isSortable: true,
    },
    {
      name: 'Descrição',
      dataKey: 'descricao',
      isSortable: true,
    },
    {
      name: 'Data de inicio',
      dataKey: 'dtinicio',
      isSortable: true,
      pipe: DatePipe,
      pipeArgs: ['dd/MM/yy'],
    },
    {
      name: 'Data de fim',
      dataKey: 'dtfim',
      isSortable: true,
      pipe: DatePipe,
      pipeArgs: ['dd/MM/yy'],
    },
    {
      name: 'Data de cadastro',
      dataKey: 'dtcadastro',
      isSortable: true,
      pipe: DatePipe,
      pipeArgs: ['dd/MM/yy'],
    },
    {
      name: 'Status',
      dataKey: 'status',
      isSortable: true,
    },
  ];
  constructor(
    private campaingService: CampaingService,
    private swalService: SwalService,
    private router: Router,
    private activeRoute: ActivatedRoute
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

    this.campaingService.getCampaings(params).subscribe({
      next: (res) => {
        this.data = res.data;
        this.itemsCount = res.itemCount;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.swalService.error.fire('Error', error.message);
      },
    });
  }

  changePage(event: PaginatorEvent) {
    (this.pagination = {
      page: event.pageIndex,
      pageCount: event.pageSize,
    }),
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

  sortTable(sort: SortInterface) {
    this.sortParams = {
      order: sort.orderDirection ?? Order.DESC,
      orderBy: sort.orderBy,
    };
    this.loadData();
  }
}