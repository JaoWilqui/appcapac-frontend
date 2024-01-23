import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxPermissionsObject, NgxPermissionsService } from 'ngx-permissions';
import { firstValueFrom } from 'rxjs';
import { ControlTypeEnum } from '../../../../_shared/components/filter/enum/control-type.enum';
import { FiltersFields } from '../../../../_shared/components/filter/interface/filter-interface.model';
import { PaginatorEvent } from '../../../../_shared/components/paginator/models/page-event.model';
import { SortInterface } from '../../../../_shared/components/table/interface/sort.model';
import { Fields } from '../../../../_shared/components/table/interface/tableColumn.interface';
import { Order } from '../../../../_shared/models/pagination.model';
import { IParams } from '../../../../_shared/models/params.model';
import { brlStates } from '../../../../_shared/models/states.model';
import { SwalService } from '../../../../_shared/services/swal.service';
import { OperatorsService } from '../../../operators/services/operators.service';
import { ProductService } from '../../../products/services/product.service';
import { IFiles } from '../../models/files.model';
import { FilesService } from '../../services/files.service';
import { RegisterFilesComponent } from '../register-files/register-files.component';

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.scss'],
})
export class ListFilesComponent implements OnInit {
  pagination = { page: 1, pageCount: 10 };
  sortParams = { order: Order.DESC, orderBy: 'id' };
  isLoading: boolean = false;

  showFilters: boolean = false;

  filterForm: FormGroup;
  itemsCount: number = 0;
  perm: NgxPermissionsObject = null;

  data: IFiles[] = [];

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
      name: 'Cidade',
      dataKey: 'cidade',
      isSortable: true,
    },
    {
      name: 'UF',
      dataKey: 'uf',
      isSortable: true,
    },
    {
      name: 'Descricao',
      dataKey: 'descricao',
      isSortable: true,
    },

    {
      name: 'Tipo',
      dataKey: 'tipo',
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
    private filesService: FilesService,
    private swalService: SwalService,
    private dialog: MatDialog,
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private operatorsService: OperatorsService,
    private permissionsService: NgxPermissionsService
  ) {
    this.perm = this.permissionsService.getPermissions();
  }
  ngOnInit() {
    this.loadData();
    this.getOperators();
    this.getProducts();
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
  register(): void {
    const dialogRef = this.dialog.open(RegisterFilesComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadData();
    });
  }

  edit(id: number) {
    const dialogRef = this.dialog.open(RegisterFilesComponent, {
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
    this.filesService.getFiles(params).subscribe({
      next: (res) => {
        this.data = res.data;
        this.itemsCount = res.itemCount;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;

        this.swalService.error.fire('Error', error.message);
      },
    });
  }

  downloadFile(path: string) {
    this.filesService.downloadFile(path).subscribe({
      next: (res) => {
        const link = document.createElement('a');
        const file = new Blob([res], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        link.href = fileURL;
        link.target = '_blank';
        document.body.append(link);
        link.click();
      },
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
          this.filesService.deleteFilesById(id).subscribe({
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
}
