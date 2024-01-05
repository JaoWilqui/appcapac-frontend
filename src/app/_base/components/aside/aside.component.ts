import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { getUser } from '../../../_store/user/user.actions';
import { IUserProfile } from '../../../auth/models/auth.model';
import { AsideMenuService, MenuLink } from './services/aside-menu.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
  host: {
    '(document:click)': 'onClickOutside($event)',
  },
})
export class AsideComponent implements OnDestroy {
  @ViewChild('toggleButton') toggleButton: ElementRef;
  @ViewChild('menu') menu: ElementRef<any>;
  @Input('isShown') isPropertiesShown = true;
  @Input('isExpanded') isExpanded: boolean = true;

  menuList: MenuLink[] = [];
  user?: IUserProfile;
  show = false;

  subscribes = new Subscription();
  private unsubscribe: Subscription[] = [];

  constructor(
    private asideMenuService: AsideMenuService,
    private store: Store<any>
  ) {
    this.unsubscribe.push(
      this.store.select(getUser).subscribe((value) => {
        this.user = value.user;
        this.menuList = this.asideMenuService.getListMenu(
          this.user.perms,
          this.user.modules
        );
      })
    );
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  changeView() {
    this.show = !this.show;
  }

  onClickOutside(event: any) {
    const clickButton = this.toggleButton?.nativeElement.contains(event.target);
    const clickedInside = this.menu?.nativeElement?.contains(event.target);
    if (!clickedInside && !clickButton) {
      this.show = false;
    }
  }
}
