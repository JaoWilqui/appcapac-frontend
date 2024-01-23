import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUserState } from '../../../../_store/user/user.selector';
import { IUserProfile } from '../../../../auth/models/auth.model';
import { CampaingService } from '../../../campaing/services/campaing.service';
import { OperatorsService } from '../../../operators/services/operators.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: IUserProfile;

  campaingsCount = 0;
  categoriesCount = 0;
  operatorsCount = 0;

  constructor(
    private store: Store<any>,
    private campaingService: CampaingService,
    private operatorsService: OperatorsService
  ) {
    this.store.select(getUserState).subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {}
}
