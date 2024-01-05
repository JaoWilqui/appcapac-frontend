import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatorEvent } from '../../../../_shared/components/paginator/models/page-event.model';
import { SortInterface } from '../../../../_shared/components/table/interface/sort.model';
import { Fields } from '../../../../_shared/components/table/interface/tableColumn.interface';
import { Order } from '../../../../_shared/models/pagination.model';
import { IParams } from '../../../../_shared/models/params.model';
import { SwalService } from '../../../../_shared/services/swal.service';
import { ICategory } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss'],
})
export class ListCategoriesComponent implements OnInit {
  pagination = { page: 1, pageCount: 10 };
  sortParams = { order: Order.DESC, orderBy: 'id' };
  data: ICategory[] = [];

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
  ];
  constructor(
    private categoryService: CategoryService,
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
