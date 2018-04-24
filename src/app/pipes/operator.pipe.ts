import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'operator',
  pure: false
})
export class OperatorPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {

  }

  transform(value: any, args?: any): any {
    const ops = {
      '+': '+',
      '-': '-',
      '*': '&times;',
      '/': '&divide;'
    };
    if (ops.hasOwnProperty(value)) {
      return this.sanitizer.bypassSecurityTrustHtml(ops[value]);
    }
    return this.sanitizer.bypassSecurityTrustHtml('&nbsp;');
  }

}
