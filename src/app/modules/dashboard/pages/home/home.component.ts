import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUser } from '../../../../_store/user/user.actions';
import { IUserProfile } from '../../../../auth/models/auth.model';
import { CampaingService } from '../../../campaing/services/campaing.service';
import { CategoryService } from '../../../category/services/category.service';
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
    private categoryService: CategoryService,
    private operatorsService: OperatorsService
  ) {
    this.store.select(getUser).subscribe((value) => {
      this.user = value.user;
    });
  }

  ngOnInit() {
    this.getCampaingCount();
    this.getCategoryCount();
    this.getOperatorsCount();
  }

  getCampaingCount() {
    this.campaingService.getCampaings({}).subscribe({
      next: (res) => {
        this.campaingsCount = res.itemCount;
      },
    });
  }

  getCategoryCount() {
    this.categoryService.getCategories({}).subscribe({
      next: (res) => {
        this.categoriesCount = res.itemCount;
      },
    });
  }
  getOperatorsCount() {
    this.operatorsService.getOperators({}).subscribe({
      next: (res) => {
        this.categoriesCount = res.itemCount;
      },
    });
  }
}
