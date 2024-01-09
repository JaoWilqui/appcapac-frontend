import { FormControl } from '@angular/forms';
import { ControlTypeEnum } from '../enum/control-type.enum';

export class FiltersFields {
  name: string;
  secondName?: string;
  control: FormControl;
  secondControl?: FormControl;
  type: ControlTypeEnum;
  maskOptions?: MaskOptions = new MaskOptions();
  label: string;
  options?: any[];
  optionKey?: string;
  valueKey?: string;
  inputType?: string;
  suffix?: string = '';
}

export class MaskOptions {
  mask: string = '';
}
