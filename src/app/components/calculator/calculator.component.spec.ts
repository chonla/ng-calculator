import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from '../../services/calculator.service';
import { OperatorPipe } from '../../pipes/operator.pipe';
import { Observable } from 'rxjs';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let calculatorServiceSpy: jasmine.SpyObj<CalculatorService>;

  beforeEach(async(() => {
    const spyCalculator = jasmine.createSpyObj('CalculatorService', ['input', 'setMaxLength', 'operationChanges', 'add', 'subtract', 'multiply', 'divide', 'solve', 'reset']);
    spyCalculator.operationChanges.and.returnValue(new Observable<string>());

    TestBed.configureTestingModule({
      declarations: [
        CalculatorComponent,
        OperatorPipe
      ],
      providers: [
        { provide: CalculatorService, useValue: spyCalculator }
      ]
    })
      .compileComponents();

    calculatorServiceSpy = TestBed.get(CalculatorService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set max length to 8 by default', () => {
    expect(calculatorServiceSpy.setMaxLength).toHaveBeenCalledWith(8);
  });

  it('should call calculator service input with given input data', () => {
    component.input('1');
    expect(calculatorServiceSpy.input).toHaveBeenCalledWith('1');
  });

  it('should call calculator service add when add', () => {
    component.add();
    expect(calculatorServiceSpy.add).toHaveBeenCalled();
  });

  it('should call calculator service subtract when subtract', () => {
    component.subtract();
    expect(calculatorServiceSpy.subtract).toHaveBeenCalled();
  });

  it('should call calculator service multiply when multiply', () => {
    component.multiply();
    expect(calculatorServiceSpy.multiply).toHaveBeenCalled();
  });

  it('should call calculator service divide when divide', () => {
    component.divide();
    expect(calculatorServiceSpy.divide).toHaveBeenCalled();
  });

  it('should call calculator service reset when clear', () => {
    component.clear();
    expect(calculatorServiceSpy.reset).toHaveBeenCalled();
  });

  it('should call calculator service solve when solve', () => {
    component.solve();
    expect(calculatorServiceSpy.solve).toHaveBeenCalled();
  });

  it('should trigger input a number', () => {
    var ev = new KeyboardEvent('window:keyup', { key: '0' });
    component.keyPressHandler(ev);

    expect(calculatorServiceSpy.input).toHaveBeenCalledWith('0');
  });

  it('should trigger add', () => {
    var ev = new KeyboardEvent('window:keyup', { key: '+' });
    component.keyPressHandler(ev);

    expect(calculatorServiceSpy.add).toHaveBeenCalled();
  });


  it('should trigger subtract', () => {
    var ev = new KeyboardEvent('window:keyup', { key: '-' });
    component.keyPressHandler(ev);

    expect(calculatorServiceSpy.subtract).toHaveBeenCalled();
  });

  it('should trigger multiply', () => {
    var ev = new KeyboardEvent('window:keyup', { key: '*' });
    component.keyPressHandler(ev);

    expect(calculatorServiceSpy.multiply).toHaveBeenCalled();
  });

  it('should trigger divide', () => {
    var ev = new KeyboardEvent('window:keyup', { key: '/' });
    component.keyPressHandler(ev);

    expect(calculatorServiceSpy.divide).toHaveBeenCalled();
  });

  it('should trigger reset', () => {
    var ev = new KeyboardEvent('window:keyup', { key: 'Escape' });
    component.keyPressHandler(ev);

    expect(calculatorServiceSpy.reset).toHaveBeenCalled();
  });

  it('should trigger solve', () => {
    var ev = new KeyboardEvent('window:keyup', { key: '=' });
    component.keyPressHandler(ev);

    expect(calculatorServiceSpy.solve).toHaveBeenCalled();
  });

  it('should also trigger solve when press Enter', () => {
    var ev = new KeyboardEvent('window:keyup', { key: 'Enter' });
    component.keyPressHandler(ev);

    expect(calculatorServiceSpy.solve).toHaveBeenCalled();
  });

  it('should do nothing when press unmapped key', () => {
    var ev = new KeyboardEvent('window:keyup', { key: ']' });
    component.keyPressHandler(ev);

    expect(calculatorServiceSpy.input).not.toHaveBeenCalled();
    expect(calculatorServiceSpy.add).not.toHaveBeenCalled();
    expect(calculatorServiceSpy.subtract).not.toHaveBeenCalled();
    expect(calculatorServiceSpy.multiply).not.toHaveBeenCalled();
    expect(calculatorServiceSpy.divide).not.toHaveBeenCalled();
    expect(calculatorServiceSpy.reset).not.toHaveBeenCalled();
    expect(calculatorServiceSpy.solve).not.toHaveBeenCalled();
  });

});
