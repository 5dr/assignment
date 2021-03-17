import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'home'
})
export class HomePipe implements PipeTransform {

  transform(value: string, args: string): any {
    if(args&&value){
      value=String(value)
      const startIndex = value.toLocaleLowerCase().indexOf(args.toLocaleLowerCase())

      if(startIndex !==-1){
        const matchingString =value.substr(startIndex,args.length)
      return value.replace(matchingString,"<span class='seach'>"+matchingString   +"</span>")
      }
    }
    return value;
  }

}
