import { OperatorPipe } from './operator.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { inject, TestBed } from '@angular/core/testing';

describe('OperatorPipe', () => {
  it('create an instance', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe = new OperatorPipe(domSanitizer);
    expect(pipe).toBeTruthy();
  }));

  it('should return safe html if defined', () => {
    const domSanitizer = jasmine.createSpyObj('domSanitizer', ['bypassSecurityTrustHtml']);
    const pipe = new OperatorPipe(domSanitizer);

    const result = pipe.transform('*');

    expect(domSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith('&times;');
  });

  it('should return blank if not defined', () => {
    const domSanitizer = jasmine.createSpyObj('domSanitizer', ['bypassSecurityTrustHtml']);
    const pipe = new OperatorPipe(domSanitizer);

    const result = pipe.transform('<');

    expect(domSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith('&nbsp;');
  });
});
