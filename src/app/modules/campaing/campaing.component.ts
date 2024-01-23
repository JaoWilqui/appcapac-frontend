import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  clearBreadcrumb,
  setBreadcrumb,
} from '../../_store/breadcrumb/breadcrumb.actions';

@Component({
  selector: 'app-campaing',
  templateUrl: './campaing.component.html',
  styleUrls: ['./campaing.component.scss'],
})
export class CampaingComponent implements OnInit, OnDestroy {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(
      setBreadcrumb({
        breadcrumb: [
          { title: 'Gerenciamento', link: '' },
          { title: 'Campanhas', link: 'campaing' },
        ],
      })
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearBreadcrumb());
  }
}
