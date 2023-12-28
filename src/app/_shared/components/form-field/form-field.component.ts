import {
  AfterViewInit,
  Component,
  ContentChild,
  Input,
  OnInit,
} from '@angular/core';
import { InputDirective } from '../../directives/custom-input.directive';

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

  @ContentChild(InputDirective) input: InputDirective;

  constructor() {}

  ngAfterViewInit(): void {}
  ngOnInit(): void {}

  public resetValue() {
    if (this.input?.control) {
      this.input.control.control.setValue('');
    } else if (this.input?.el) {
      this.input.el.nativeElement.value = '';
    }
  }
}
