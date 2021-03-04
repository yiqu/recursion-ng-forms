import {Pipe, PipeTransform} from '@angular/core';

@Pipe ({
   name : 'labelName'
})
export class AnimalPipeDisplay implements PipeTransform {
   transform(val : string) : string {
     if (val === 'petName') {
      return 'Pet Name';
     }
    return val;
   }
}
