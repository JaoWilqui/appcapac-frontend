import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'Batery' })
export class BateryPipe implements PipeTransform {
  transform(customColumns: any, nameColumn?: string): any[] {
    return customColumns.filter((customColumn) => {
      return customColumn['field'] === nameColumn;
    });
  }
}
