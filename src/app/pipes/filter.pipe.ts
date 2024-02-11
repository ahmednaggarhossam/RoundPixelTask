import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(data: any[], keyword: string, filterFields: string[] = []): any[] {
    if(!data || !keyword || !filterFields.length) {
      return data;
    }
    const lowerKeyword = keyword.toLowerCase();
    return data.filter(item => {
      return filterFields.some(field =>{
        const fieldValue = item[field]?.toString().toLowerCase();
        return fieldValue?.includes(lowerKeyword);
      })
    })
    }
}
