import { Pipe, PipeTransform } from '@angular/core';
import { min } from 'rxjs';

@Pipe({
  name: 'timePipe'
})
export class TimePipePipe implements PipeTransform {

  transform(value: string | Date): string {
    if(!value){
      return '';
    }
    const time = new Date(value);
    const hrs = time.getHours();
    const mins = time.getMinutes();
    const formattedHrs = hrs < 10 ? `0${hrs}` : `${hrs}`;
    const formattedMins = mins < 10 ? `0${mins}` : `${mins}`;


    return `${formattedHrs}:${formattedMins}`;
  }

}
