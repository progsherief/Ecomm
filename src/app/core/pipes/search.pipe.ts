import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(arrayOfobject: any[], searchWord: string): any[] {
    return arrayOfobject.filter((item )=> item.title.toLowerCase().includes(searchWord.toLowerCase()));
  }

}
