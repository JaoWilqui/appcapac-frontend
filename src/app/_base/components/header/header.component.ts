import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getUser } from '../../../_store/user/user.actions';
import { IUserProfile } from '../../../auth/models/auth.model';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: IUserProfile;

  constructor(
    private authService: AuthService,
    private store: Store<any>,
    private router: Router
  ) {
    this.store.select(getUser).subscribe((value) => {
      this.user = value.user;
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
