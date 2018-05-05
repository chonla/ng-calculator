import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CalculatorService } from '../../services/calculator.service';
import { Observable ,  Subscription } from 'rxjs';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit, OnDestroy {
  private observable: Observable<string>;
  private subscription$: Subscription;

  public result: string;
  public operator: string;

  constructor(private calc: CalculatorService) {
    this.calc.setMaxLength(8);
    this.observable = this.calc.operationChanges();
    this.observable.subscribe(val => {
      this.result = val['result'];
      this.operator = val['operator'];
    });
  }

  @HostListener('window:keyup', ['$event'])
  keyPressHandler(ev: KeyboardEvent) {
    const handlerMap = {
      '0': () => this.input('0'),
      '1': () => this.input('1'),
      '2': () => this.input('2'),
      '3': () => this.input('3'),
      '4': () => this.input('4'),
      '5': () => this.input('5'),
      '6': () => this.input('6'),
      '7': () => this.input('7'),
      '8': () => this.input('8'),
      '9': () => this.input('9'),
      '+': () => this.add(),
      '-': () => this.subtract(),
      '*': () => this.multiply(),
      '/': () => this.divide(),
      '=': () => this.solve(),
      'Enter': () => this.solve(),
      'Escape': () => this.clear()
    }
    if (handlerMap.hasOwnProperty(ev.key)) {
      handlerMap[ev.key]();
    }
  }

  input(v: string) {
    this.calc.input(v);
  }

  add() {
    this.calc.add();
  }

  subtract() {
    this.calc.subtract();
  }

  multiply() {
    this.calc.multiply();
  }

  divide() {
    this.calc.divide();
  }

  solve() {
    this.calc.solve();
  }

  clear() {
    this.calc.reset();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

}
