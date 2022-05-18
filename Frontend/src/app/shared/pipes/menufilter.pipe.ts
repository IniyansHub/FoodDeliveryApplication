import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'menufilter'
})
export class MenufilterPipe implements PipeTransform {

  transform(value: any, filterString: string) {

    if (filterString === '') {
      return value;
    }

    return value.filter((data: any) =>
      (data.dishes).toLowerCase().indexOf(filterString.toLowerCase()) !== -1
    )


  }

}
