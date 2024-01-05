import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IUserProfile } from '../../../auth/models/auth.model';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'user-inner',
  templateUrl: './user-inner.component.html',
  styleUrls: ['./user-inner.component.scss'],
})
export class UserInnerComponent implements OnInit {
  @Input() user: IUserProfile = new IUserProfile();
  show = false;
  role: string;

  constructor(private store: Store, private authService: AuthService) {}

  logout() {
    this.authService.logout('login');
  }

  ngOnInit(): void {}
}
