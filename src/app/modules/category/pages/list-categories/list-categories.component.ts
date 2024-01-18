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
import { ICategory } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { CategoryRegisterComponent } from '../category-register/category-register.component';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss'],
})
export class ListCategoriesComponent implements OnInit {
  pagination = { page: 1, pageCount: 10 };
  sortParams = { order: Order.DESC, orderBy: 'id' };
  data: ICategory[] = [];
  filterForm: FormGroup;
  perm: NgxPermissionsObject = null;

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
      name: 'Data de cadastro',
      dataKey: 'dtcadastro',
      isSortable: true,
    },
  ];

  filterControls: FiltersFields[] = [
    {
      control: new FormControl(''),
      name: 'nome',
      label: 'Nome',
      type: ControlTypeEnum.FORM,
    },
    {
      label: 'Descrição',
      control: new FormControl(''),
      name: 'descricao',
      type: ControlTypeEnum.FORM,
    },

    {
      label: 'Data de cadastro',
      control: new FormControl(null),
      name: 'dtcadastro',
      type: ControlTypeEnum.DATE_PICKER,
    },
  ];
  constructor(
    private categoryService: CategoryService,
    private swalService: SwalService,
    private router: Router,
    private dialog: MatDialog,
    private permissionsService: NgxPermissionsService,
    private activeRoute: ActivatedRoute
  ) {
    this.perm = this.permissionsService.getPermissions();
  }

  ngOnInit() {
    this.loadData();
  }

  register(): void {
    const dialogRef = this.dialog.open(CategoryRegisterComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadData();
    });
  }

  edit(id: number) {
    const dialogRef = this.dialog.open(CategoryRegisterComponent, {
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
    this.categoryService.getCategories(params).subscribe({
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

  delete(id: number) {
    this.swalService.warning
      .fire({
        title: 'Aviso',
        text: `Deseja deletar a categoria ${id} ? Essa ação não pode ser desfeita!`,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        showCancelButton: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.categoryService.deleteCategoryById(id).subscribe({
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
}
