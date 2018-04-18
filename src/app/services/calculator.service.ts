import { Injectable } from '@angular/core';

@Injectable()
export class CalculatorService {

  private operand: string[];
  private operator: string;
  private op: number;
  private is_error: boolean;

  constructor() {
    this.reset();
  }

  value(): string {
    return this.operand[this.op];
  }

  input(v: string) {
    if (this.is_error) {
      return;
    }
    if ('' !== this.operator && 0 === this.op) {
      this.op = 1;
    }
    if (this.is_digit(v)) {
      if ('0' === this.operand[this.op]) {
        this.operand[this.op] = v;
      } else {
        this.operand[this.op] += v;
      }
    }
  }

  is_digit(v: string) {
    return (v.length === 1) && ('1234567890'.indexOf(v) >= 0);
  }

  reset() {
    this.operand = ['0', '0'];
    this.operator = '';
    this.op = 0;
    this.is_error = false;
  }

  add() {
    this.operator = '+';
  }

  subtract() {
    this.operator = '-';
  }

  multiply() {
    this.operator = '*';
  }

  divide() {
    this.operator = '/';
  }

  solve() {
    var result = '';
    if ('/' === this.operator && '0' === this.operand[1]) {
      result = 'div-by-0';
      this.reset();
      this.is_error = true;
    } else {
      result = eval(`${this.operand[0]}${this.operator}${this.operand[1]}`);
      this.reset();
    }
    this.operand[0] = result.toString();
  }
}
