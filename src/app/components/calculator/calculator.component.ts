import { Component, OnInit, OnDestroy } from '@angular/core';
import { CalculatorService } from '../../services/calculator.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit, OnDestroy {
  private observable: Observable<string>;
  private subscription$: Subscription;

  public result: string;

  constructor(private calc: CalculatorService) {
    this.observable = calc.operationChanges();
    this.observable.subscribe(val => {
      this.result = val;
    });
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
