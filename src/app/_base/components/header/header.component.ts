import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getBreadcrumbs } from '../../../_store/breadcrumb/breadcrumb.selector';
import { getUserState } from '../../../_store/user/user.selector';
import { IUserProfile } from '../../../auth/models/auth.model';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: IUserProfile;

  breadCrumb: { title: string; link: string }[] = [];

  constructor(
    private authService: AuthService,
    private store: Store<any>,
    private router: Router,
    private acitveRoute: ActivatedRoute
  ) {
    this.store.select(getUserState).subscribe((user) => {
      this.user = user;
    });
    this.store.select(getBreadcrumbs).subscribe((breadcrumb) => {
      this.breadCrumb = breadcrumb;
    });
  }

  ngOnInit(): void {}

  logout() {
    this.authService.logout('login');
  }

  goToProfile() {
    this.router.navigate(['users/profile/edit']);
  }
}
