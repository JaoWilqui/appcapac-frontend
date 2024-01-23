import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  clearBreadcrumb,
  setBreadcrumb,
} from '../../_store/breadcrumb/breadcrumb.actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(
      setBreadcrumb({
        breadcrumb: [
          { title: 'Gerenciamento', link: '' },
          { title: 'Produtos', link: 'product' },
        ],
      })
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearBreadcrumb());
  }
}
