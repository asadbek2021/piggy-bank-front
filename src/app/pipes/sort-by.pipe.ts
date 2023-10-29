import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByDate',
})
export class SortByPipe implements PipeTransform {
  transform(value: any[], approve: boolean) {
    let result = [];
    if (value && approve) {
      result = value.slice().sort((a, b) => {
        if (
          new Date(a.date_of_operation).getTime() -
            new Date(b.date_of_operation).getTime() >
          0
        ) {
          return -1;
        }
        if (
          new Date(a.date_of_operation).getTime() -
            new Date(b.date_of_operation).getTime() <
          0
        ) {
          return 1;
        }
        return 0;
      });
      return result;
    } else {
      return value;
    }
  }
}
