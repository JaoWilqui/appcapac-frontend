import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {
  transform(fone: any): any {
    let dateformat;
    let args: string;

    if (fone.length > 10) {
      args = '(XX) X XXXX-XXXX';
    } else if (fone.length == 8) {
      args = 'XXXX-XXXX';
    } else {
      args = '(XX) XXXX-XXXX';
    }

    if (args == '(XX) XXXX-XXXX') {
      dateformat =
        '(' +
        fone.substring(0, 2) +
        ') ' +
        fone.substring(2, 6) +
        '-' +
        fone.substring(6, 10);

      return dateformat;
    }

    if (args == '(XX) X XXXX-XXXX') {
      dateformat =
        '(' +
        fone.substring(0, 2) +
        ') ' +
        fone.substring(2, 3) +
        ' ' +
        fone.substring(3, 7) +
        '-' +
        fone.substring(7, 11);

      return dateformat;
    }

    if (args == 'XXXX-XXXX') {
      dateformat = fone.substring(0, 4) + '-' + fone.substring(4, 8);

      return dateformat;
    }
  }
}
