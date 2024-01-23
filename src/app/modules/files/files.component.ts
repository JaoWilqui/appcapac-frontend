import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  clearBreadcrumb,
  setBreadcrumb,
} from '../../_store/breadcrumb/breadcrumb.actions';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
})
export class FilesComponent implements OnInit, OnDestroy {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(
      setBreadcrumb({
        breadcrumb: [
          { title: 'Documentação', link: '' },
          { title: 'Arquivos', link: 'files' },
        ],
      })
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearBreadcrumb());
  }
}
