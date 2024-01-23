import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  clearBreadcrumb,
  setBreadcrumb,
} from '../../_store/breadcrumb/breadcrumb.actions';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(
      setBreadcrumb({
        breadcrumb: [
          { title: 'Administrativo', link: '' },
          { title: 'Usuários', link: 'users' },
          { title: 'Perfil', link: 'users/profile/edit' },
          { title: 'Alterar Senha', link: 'users/profile/change-password' },
        ],
      })
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearBreadcrumb());
  }
}
