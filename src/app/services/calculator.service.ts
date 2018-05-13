import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CalculatorService {

  private operand: string[];
  private operator: string;
  private op: number;
  private max_len: number;
  private is_error: boolean;
  private source: BehaviorSubject<any>;
  private memory: string;

  constructor() {
    this.source = new BehaviorSubject<any>({
      'result': '0',
      'operator': '',
      'memory': false
    });
    this.max_len = 0;
    this.memory = '0';
    this.reset();
  }

  setMaxLength(l: number) {
    if (l < 0) {
      l = 0;
    }
    this.max_len = l;
  }

  private emitChanges() {
    this.source.next({
      'result': this.operand[this.op],
      'operator': this.operator,
      'memory': (this.memory !== '0')
    });
  }

  operationChanges(): Observable<any> {
    return this.source.asObservable();
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
    if (this.isDigit(v)) {
      if ('0' === this.operand[this.op]) {
        this.operand[this.op] = v;
      } else {
        if (this.max_len === 0 || (this.max_len > 0 && this.operand[this.op].length < this.max_len)) {
          this.operand[this.op] += v;
        }
      }
    }
    this.emitChanges();
  }

  raise(msg: string) {
    this.reset();
    this.operand[0] = msg;
    this.is_error = true;
    this.emitChanges();
  }

  isDigit(v: string) {
    return (v.length === 1) && ('1234567890'.indexOf(v) >= 0);
  }

  reset() {
    this.operand = ['0', '0'];
    this.operator = '';
    this.op = 0;
    this.is_error = false;
    this.emitChanges();
  }

  add() {
    this.operator = '+';
    this.emitChanges();
  }

  subtract() {
    this.operator = '-';
    this.emitChanges();
  }

  multiply() {
    this.operator = '*';
    this.emitChanges();
  }

  divide() {
    this.operator = '/';
    this.emitChanges();
  }

  isDecimal(n: string) {
    return n.indexOf('.') >= 0;
  }

  trimResult(n: string) {
    if (this.max_len > 0) {
      const f = n.split('.');
      if (f[0].length > this.max_len) {
        return n;
      }
      const fn = f[1].substr(0, this.max_len - f[0].length);
      if (fn !== '') {
        n = `${f[0]}.${fn}`;
      } else {
        n = f[0];
      }
    }
    return n;
  }

  solve() {
    let result = '';
    if ('/' === this.operator && '0' === this.operand[1]) {
      this.raise('div-by-0');
      return;
    } else {
      if ('' === this.operator) {
        this.emitChanges();
        return;
      }
      result = this.evaluate(`${this.operand[0]}${this.operator}${this.operand[1]}`);

      if (this.isDecimal(result)) {
        result = this.trimResult(result);
        if (this.max_len > 0 && result.replace('.', '').length > this.max_len) {
          this.raise('overflow');
          return;
        }
      } else {
        if (this.max_len > 0 && result.length > this.max_len) {
          this.raise('overflow');
          return;
        }
      }
      this.reset();
    }
    this.operand[0] = result;
    this.emitChanges();
  }

  evaluate(expression: string) {
    var result = eval(expression).toString();
    return result;
  }

  showMemory() {
    this.operand[this.op] = this.memory;
    this.emitChanges();
  }

  addToMemory(v: string) {
    this.memory = this.evaluate(`${this.memory}+${v}`);
    this.emitChanges();
  }

  subtractFromMemory(v: string) {
    this.memory = this.evaluate(`${this.memory}-${v}`);
    this.emitChanges();
  }

  clearMemory() {
    this.memory = '0';
    this.emitChanges();
  }
}
