import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPermissionsObject, NgxPermissionsService } from 'ngx-permissions';
import { ControlTypeEnum } from '../../../../_shared/components/filter/enum/control-type.enum';
import { FiltersFields } from '../../../../_shared/components/filter/interface/filter-interface.model';
import { PaginatorEvent } from '../../../../_shared/components/paginator/models/page-event.model';
import { SortInterface } from '../../../../_shared/components/table/interface/sort.model';
import { Fields } from '../../../../_shared/components/table/interface/tableColumn.interface';
import { Order } from '../../../../_shared/models/pagination.model';
import { IParams } from '../../../../_shared/models/params.model';
import { SwalService } from '../../../../_shared/services/swal.service';
import { ICampaing } from '../../models/campaing.model';
import { CampaingService } from '../../services/campaing.service';
import { CampaingRegisterComponent } from '../campaing-register/campaing-register.component';

@Component({
  selector: 'app-list-campaings',
  templateUrl: './list-campaings.component.html',
  styleUrls: ['./list-campaings.component.scss'],
})
export class ListCampaingsComponent implements OnInit {
  pagination = { page: 1, pageCount: 10 };
  sortParams = { order: Order.DESC, orderBy: 'id' };
  data: ICampaing[] = [];
  filterForm: FormGroup;
  isLoading: boolean = false;
  perm: NgxPermissionsObject = null;
  showFilters: boolean = false;
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

  selectFilterOptions = [
    { label: 'ATIVO', value: 'ATIVO' },
    { label: 'INATIVO', value: 'INATIVO' },
  ];

  filterControls: FiltersFields[] = [
    {
      control: new FormControl(''),
      name: 'nome',
      label: 'Nome',
      type: ControlTypeEnum.FORM,
    },
    {
      control: new FormControl(''),
      name: 'status',
      label: 'Status',
      options: this.selectFilterOptions,
      optionKey: 'label',
      valueKey: 'value',
      type: ControlTypeEnum.SELECT,
    },
    {
      label: 'Data de Inicio',
      control: new FormControl(''),
      name: 'dtinicio',
      type: ControlTypeEnum.DATE_PICKER,
    },
    {
      label: 'Data de Fim',
      control: new FormControl(''),
      name: 'dtfim',
      type: ControlTypeEnum.DATE_PICKER,
    },

    {
      label: 'Data de cadastro',
      control: new FormControl(null),
      name: 'dtcadastro',
      type: ControlTypeEnum.DATE_PICKER,
    },
  ];
  constructor(
    private campaingService: CampaingService,
    private swalService: SwalService,
    private router: Router,
    private dialog: MatDialog,
    private permissionsService: NgxPermissionsService,
    private activeRoute: ActivatedRoute
  ) {
    this.perm = this.permissionsService.getPermissions();
  }

  register(): void {
    const dialogRef = this.dialog.open(CampaingRegisterComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadData();
    });
  }

  edit(id: number) {
    const dialogRef = this.dialog.open(CampaingRegisterComponent, {
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadData();
    });
  }
  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    const filters = this.getFilters();

    const params: IParams = {
      ...filters,
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

  delete(id: number) {
    this.swalService.warning
      .fire({
        title: 'Aviso',
        text: `Deseja deletar a campanha ${id} ? Essa ação não pode ser desfeita!`,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        showCancelButton: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.campaingService.deleteCampaingById(id).subscribe({
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

      if (filters['dtinicio']) {
        filters['dtinicio'] = new Date(filters['dtinicio']).toISOString();
      }
      if (filters['dtfim']) {
        filters['dtfim'] = new Date(filters['dtfim']).toISOString();
      }

      Object.keys(filters).forEach((key) => {
        if (!filters[key]) {
          delete filters[key];
        }
      });
    }

    return filters;
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
