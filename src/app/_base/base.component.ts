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

import { User } from '../_shared/models/user.model';

@Component({
  selector: 'app-layout',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('aside') side!: ElementRef<any>;
  @ViewChild('content') content!: ElementRef<any>;
  allowHover = true;
  isExpanded = true;

  innerWidth: number;
  user?: User;

  isPropertiesShown = true;

  isLoading = false;

  sidebarAllowed = true;

  @HostListener('window:resize', ['$event'])
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event): void {
    console.log(window);
    if (
      !this.side.nativeElement.contains(event.target) &&
      window.innerWidth <= 1000
    ) {
      this.isExpanded = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  constructor(private renderer: Renderer2) {
    this.onResize();
  }
  ngOnDestroy(): void {}

  ngOnInit(): void {}

  mouseEnter() {
    if (this.isExpanded && this.allowHover) {
      return;
    }

    this.renderer.setStyle(this.side.nativeElement, 'width', '275px');
    this.isPropertiesShown = true;
  }

  handleExpansion() {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      this.renderer.setStyle(this.side.nativeElement, 'width', '275px');
      this.isPropertiesShown = true;
    } else {
      this.renderer.setStyle(this.side.nativeElement, 'width', '70px');
      this.isPropertiesShown = false;
    }
    if (this.isExpanded) {
      this.isPropertiesShown = true;
    } else {
      this.isPropertiesShown = false;
    }
  }

  mouseExit() {
    if (this.isExpanded && this.allowHover) {
      return;
    }
    this.renderer.setStyle(this.side.nativeElement, 'width', '70px');
    this.isPropertiesShown = false;
  }

  handleResize() {
    if (this.innerWidth <= 1000) {
      this.allowHover = false;
      this.isExpanded = false;
      this.isPropertiesShown = false;
      this.renderer.setStyle(this.side.nativeElement, 'width', '70px');
    }
  }

  ngAfterViewInit(): void {
    this.handleResize();
  }
}
