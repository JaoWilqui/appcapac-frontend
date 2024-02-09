import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { getUserState } from '../../../_store/user/user.selector';
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
export class AsideComponent implements OnDestroy, OnChanges {
  @ViewChild('toggleButton') toggleButton: ElementRef;
  @ViewChild('menu') menu: ElementRef<any>;
  @Input('isShown') isPropertiesShown = true;
  @Input('isExpanded') isExpanded: boolean = true;
  @Output() emitExpand = new EventEmitter<any>();

  menuList: MenuLink[] = [];
  user?: IUserProfile;
  show = false;
  innerWidth: number;
  subscribes = new Subscription();
  private unsubscribe: Subscription[] = [];

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    this.isExpanded = false;
  }

  constructor(
    private asideMenuService: AsideMenuService,
    private store: Store<any>,
    private router: Router
  ) {
    this.onResize();

    this.unsubscribe.push(
      this.store.select(getUserState).subscribe((user) => {
        this.user = user;
        this.menuList = this.asideMenuService.getListMenu(
          this.user.perms,
          this.user.modules
        );
      })
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isExpanded']) {
      console.log(this.innerWidth);
      if (this.isExpanded == false) {
        this.menuList.forEach((menu) => {
          menu.expanded = false;
        });
      }
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  goToProfile() {
    this.router.navigate(['users/profile/edit']);
  }

  changeView() {
    this.show = !this.show;
  }

  expand() {
    this.emitExpand.emit('');
  }

  onClickOutside(event: any) {
    const clickButton = this.toggleButton?.nativeElement.contains(event.target);
    const clickedInside = this.menu?.nativeElement?.contains(event.target);
    if (!clickedInside && !clickButton) {
      this.show = false;
    }
  }
}
