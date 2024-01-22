import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent implements OnInit, AfterViewInit {
  style: string = '';

  @Input() set setStyle(styleProperties: string) {
    this.style = styleProperties;
  }

  constructor() {}

  ngAfterViewInit(): void {}
  ngOnInit(): void {}
}
