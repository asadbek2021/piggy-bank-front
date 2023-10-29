import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByTitle',
})
export class SearchPipe implements PipeTransform {
  transform(value: any[], searchValue: string) {
    let result = [];
    if (value && searchValue) {
      for (const item of value) {
        if (item.title.toLowerCase().match(searchValue.toLowerCase())) {
          result.push(item);
        }
      }
      return result;
    } else {
      return value;
    }
  }
}
