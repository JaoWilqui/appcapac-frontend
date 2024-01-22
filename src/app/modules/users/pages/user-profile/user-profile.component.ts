import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUser } from '../../../../_store/user/user.actions';
import { IUserProfile } from '../../../../auth/models/auth.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: IUserProfile;

  constructor(private store: Store<any>) {
    this.store.select(getUser).subscribe((value) => {
      this.user = value.user;
    });
  }
  ngOnInit() {}
}
