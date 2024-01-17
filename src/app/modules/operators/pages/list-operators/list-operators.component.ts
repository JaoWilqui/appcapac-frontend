import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ControlTypeEnum } from '../../../../_shared/components/filter/enum/control-type.enum';
import { FiltersFields } from '../../../../_shared/components/filter/interface/filter-interface.model';
import { PaginatorEvent } from '../../../../_shared/components/paginator/models/page-event.model';
import { SortInterface } from '../../../../_shared/components/table/interface/sort.model';
import { Fields } from '../../../../_shared/components/table/interface/tableColumn.interface';
import { Order } from '../../../../_shared/models/pagination.model';
import { IParams } from '../../../../_shared/models/params.model';
import { SwalService } from '../../../../_shared/services/swal.service';
import { IOperator } from '../../models/operators.model';
import { OperatorsService } from '../../services/operators.service';
import { OperatorsRegisterComponent } from '../operators-register/operators-register.component';

@Component({
  selector: 'app-list-operators',
  templateUrl: './list-operators.component.html',
  styleUrls: ['./list-operators.component.scss'],
})
export class ListOperatorsComponent implements OnInit {
  pagination = { page: 1, pageCount: 10 };
  sortParams = { order: Order.DESC, orderBy: 'id' };
  data: IOperator[] = [];
  filterForm: FormGroup;
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
  ];
  constructor(
    private operatorsService: OperatorsService,
    private swalService: SwalService,
    private router: Router,
    private dialog: MatDialog,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadData();
  }

  register(): void {
    const dialogRef = this.dialog.open(OperatorsRegisterComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadData();
    });
  }

  edit(id: number) {
    const dialogRef = this.dialog.open(OperatorsRegisterComponent, {
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadData();
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
    this.operatorsService.getOperators(params).subscribe({
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
        text: `Deseja deletar a operadora ${id} ? Essa ação não pode ser desfeita!`,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        showCancelButton: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.operatorsService.deleteOperatorsById(id).subscribe({
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
