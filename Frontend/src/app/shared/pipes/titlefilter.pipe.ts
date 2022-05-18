import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titlefilter'
})
export class TitlefilterPipe implements PipeTransform {

  transform(value: any, filterString: string) {

    if (filterString === '') {
      return value;
    }

    return value.filter((data: any) =>
      (data.hotelName).toLowerCase().indexOf(filterString.toLowerCase()) !== -1
    )


  }
}
