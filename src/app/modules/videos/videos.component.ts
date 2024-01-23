import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  clearBreadcrumb,
  setBreadcrumb,
} from '../../_store/breadcrumb/breadcrumb.actions';

@Component({
  selector: 'videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent implements OnInit, OnDestroy {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(
      setBreadcrumb({
        breadcrumb: [
          { title: 'Treinamentos', link: '' },
          { title: 'Videos', link: 'videos' },
        ],
      })
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearBreadcrumb());
  }
}
