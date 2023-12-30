import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxPermissionsService } from 'ngx-permissions';
import { Subscription } from 'rxjs';
import { User } from '../../../_shared/models/user.model';
import { AsideMenuService, MenuLink } from './services/aside-menu.service';

type MenuTree = { [key: string]: MenuLink[] };

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

  listMenu: MenuLink[] = [];
  user?: User;
  show = false;

  tree: MenuTree;

  private unsubscribe: Subscription[] = [];

  constructor(
    private permissionsService: NgxPermissionsService,
    private asideMenuService: AsideMenuService,
    private store: Store<any>,
    private router: Router
  ) {
    let perm = this.permissionsService.getPermissions();
    this.store.select('user').subscribe((value) => {
      this.user = value;
      this.listMenu = this.asideMenuService.getListMenu(perm[value?.role].name);
      this.tree = this.mountMenuTree();
    });
  }

  mountMenuTree(): MenuTree {
    let currSection = null;
    const tree: MenuTree = {};

    for (const link of this.listMenu) {
      if (link.section) {
        currSection = link.section;
        tree[currSection] = [];
      } else {
        tree[currSection].push(link);
      }
    }

    return tree;
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
