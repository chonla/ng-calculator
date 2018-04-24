import { OperatorPipe } from './operator.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { inject } from '@angular/core/testing';

describe('OperatorPipe', () => {
  it('create an instance', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe = new OperatorPipe(domSanitizer);
    expect(pipe).toBeTruthy();
  }));
});
