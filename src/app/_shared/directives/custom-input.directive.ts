import {
  AfterViewInit,
  Directive,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[customInput]',
  host: {
    '(input)': 'changeStyleIfInvalid($event)',
    '(keyup)': 'changeStyleIfInvalid($event)',
    '(click)': 'changeStyleIfInvalid($event)',
  },
})
export class InputDirective implements OnInit, AfterViewInit {
  constructor(
    public el: ElementRef<any>,
    public control: NgControl,
    public renderer: Renderer2
  ) {}
  ngAfterViewInit(): void {
    this.renderer.setProperty(this.el.nativeElement, 'placeholder', ' ');
  }
  ngOnInit(): void {}

  changeStyleIfInvalid() {
    if (this.control.untouched || this.control.touched) {
      if (this.control.invalid) {
        if (this.el.nativeElement.localName === 'textarea') {
          this.renderer.setStyle(
            this.el.nativeElement,
            'border',
            '1px solid red'
          );
          return;
        }
        this.renderer.addClass(
          this.el.nativeElement.parentNode,
          'invalid-input'
        );
      } else {
        if (this.el.nativeElement.localName === 'textarea') {
          this.renderer.setStyle(
            this.el.nativeElement,
            'border',
            '1px solid #bca9a9'
          );
          return;
        }
        this.renderer.removeClass(
          this.el.nativeElement.parentNode,
          'invalid-input'
        );
      }
    }
  }
}
