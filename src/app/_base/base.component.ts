import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

import {
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../_shared/models/user.model';

@Component({
  selector: 'app-layout',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('aside') side!: ElementRef<any>;
  allowOpen = true;
  isExpanded = true;

  user?: User;

  isPropertiesShown = true;

  isLoading = false;

  sidebarAllowed = true;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.handleResize();
  }

  listenToRouterChange() {
    let asyncLoadCount = 0;

    const calculateLoading = () => {
      if (asyncLoadCount < 0) {
        asyncLoadCount = 0;
      }
      this.isLoading = !!asyncLoadCount;
    };

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        asyncLoadCount++;
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationError
      ) {
        asyncLoadCount--;
      }

      calculateLoading();
    });
  }

  constructor(
    private renderer: Renderer2,
    private store: Store<any>,
    private router: Router
  ) {
    this.listenToRouterChange();
    this.store.select('user').subscribe((res) => {
      this.user = res;
    });
    this.store.select('sidebarAllowed').subscribe((res) => {
      if (typeof res !== 'boolean') {
        return;
      }
      this.sidebarAllowed = res;
    });
  }
  ngOnDestroy(): void {}

  ngOnInit(): void {}

  mouseEnter() {
    if (this.isExpanded) {
      return;
    }

    this.renderer.setStyle(this.side.nativeElement, 'width', '350px');
    this.isPropertiesShown = true;
  }

  logout() {}

  handleExpansion() {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      this.renderer.setStyle(this.side.nativeElement, 'width', '350px');
    } else {
      this.renderer.setStyle(
        this.side.nativeElement,
        'width',
        /*'70px'*/ '0px'
      );
    }

    this.isPropertiesShown = !this.isPropertiesShown;
  }

  mouseExit() {
    if (this.isExpanded) {
      return;
    }

    this.renderer.setStyle(this.side.nativeElement, 'width', /*'70px'*/ '0px');
    this.isPropertiesShown = false;
  }

  handleResize() {
    if (window.innerWidth < 1100) {
      this.allowOpen = false;
      this.isExpanded = false;
      this.isPropertiesShown = false;

      this.renderer.setStyle(
        this.side.nativeElement,
        'width',
        /*'70px'*/ '0px'
      );
      return;
    }
    this.allowOpen = true;
  }

  ngAfterViewInit(): void {
    this.handleResize();
  }
}
