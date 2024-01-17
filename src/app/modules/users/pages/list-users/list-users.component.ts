import { DatePipe } from '@angular/common';
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
import { User } from '../../../../_shared/models/user.model';
import { SwalService } from '../../../../_shared/services/swal.service';
import { UsersService } from '../../services/users.service';
import { UsersRegisterComponent } from '../users-register/users-register.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  pagination = { page: 1, pageCount: 10 };
  sortParams = { order: Order.DESC, orderBy: 'id' };
  isLoading: boolean = false;
  filterForm: FormGroup;

  data: User[] = [];

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
      name: 'Sobrenome',
      dataKey: 'sobrenome',
      isSortable: true,
    },
    {
      name: 'Email',
      dataKey: 'email',
      isSortable: true,
    },
    {
      name: 'CPF',
      dataKey: 'cpf',
      isSortable: true,
    },
    {
      name: 'Data de cadastro',
      dataKey: 'dtcadastro',
      isSortable: true,
      pipe: DatePipe,
      pipeArgs: ['dd/MM/yy'],
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
      control: new FormControl(''),
      name: 'sobrenome',
      label: 'Sobrenome',
      type: ControlTypeEnum.FORM,
    },
    {
      control: new FormControl(''),
      name: 'cpf',
      label: 'CPF',
      maskOptions: { mask: '000.000.000-00' },
      type: ControlTypeEnum.FORM,
    },
    {
      control: new FormControl(''),
      name: 'email',
      label: 'E-mail',
      type: ControlTypeEnum.FORM,
    },

    {
      label: 'Data de cadastro',
      control: new FormControl(null),
      secondControl: new FormControl(null),
      name: 'dtcadastro',
      type: ControlTypeEnum.DATE_PICKER,
    },
  ];
  constructor(
    private usersService: UsersService,
    private swalService: SwalService,
    private router: Router,
    private dialog: MatDialog,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadData();
  }

  register(): void {
    const dialogRef = this.dialog.open(UsersRegisterComponent, {
      height: '80vh',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadData();
    });
  }

  edit(id: number) {
    const dialogRef = this.dialog.open(UsersRegisterComponent, {
      height: '80vh',
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

    this.usersService.getUsers(params).subscribe({
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
      console.log('aqui');

    this.loadData();
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

  delete(id: number) {
    this.swalService.warning
      .fire({
        title: 'Aviso',
        text: `Deseja deletar o usuário ${id} ? Essa ação não pode ser desfeita!`,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        showCancelButton: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.usersService.deleteUserById(id).subscribe({
            next: (res) => {
              this.swalService.success.fire('Sucesso', res.message);
              this.loadData();
            },
          });
        }
      });
  }

  submitFilters(formGroup: FormGroup) {
    this.filterForm = formGroup;
    this.pagination.page = 1;
    console.log('aqui');
    this.loadData();
  }
  clearFilters(formGroup: FormGroup) {
    this.filterForm = formGroup;
    console.log('aqui');

    this.loadData();
  }

  sortTable(sort: SortInterface) {
    this.sortParams = {
      order: sort.orderDirection ?? Order.DESC,
      orderBy: sort.orderBy,
    };
    console.log('aqui');

    this.loadData();
  }
}
