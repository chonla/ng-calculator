import { TestBed, inject } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalculatorService]
    });

    service = TestBed.get(CalculatorService);
  });

  describe('Operand 1', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should have value 0 when initialized', () => {
      const result = service.value();
      expect(result).toBe('0');
    });

    it('should have value 1 when input 1', () => {
      service.input('1');
      const result = service.value();
      expect(result).toBe('1');
    });

    it('should have value 12 when input 1 and 2', () => {
      service.input('1');
      service.input('2');
      const result = service.value();
      expect(result).toBe('12');
    });

    it('should have value 123 when input 1, 2 and 3', () => {
      service.input('1');
      service.input('2');
      service.input('3');
      const result = service.value();
      expect(result).toBe('123');
    });

    it('should have reset to 0 when reset', () => {
      service.input('1');
      service.input('2');
      service.input('3');
      service.reset();
      const result = service.value();
      expect(result).toBe('0');
    });

    it('should remain 0 if current result is 0 and input 0', () => {
      service.input('0');
      service.input('0');
      service.input('0');
      const result = service.value();
      expect(result).toBe('0');
    });

    it('should accept only number', () => {
      for (var i = 0; i <= 255; i++) {
        service.input(String.fromCharCode(i));
      }
      service.input('0');
      const result = service.value();
      expect(result).toBe('1234567890');
    });
  });

  describe('Operator', () => {
    it('should have value 123 when add', () => {
      service.input('1');
      service.input('2');
      service.input('3');
      service.add();
      const result = service.value();
      expect(result).toBe('123');
    });

    it('should have value 123 when subtract', () => {
      service.input('1');
      service.input('2');
      service.input('3');
      service.subtract();
      const result = service.value();
      expect(result).toBe('123');
    });

    it('should have value 123 when multiply', () => {
      service.input('1');
      service.input('2');
      service.input('3');
      service.multiply();
      const result = service.value();
      expect(result).toBe('123');
    });

    it('should have value 123 when divide', () => {
      service.input('1');
      service.input('2');
      service.input('3');
      service.divide();
      const result = service.value();
      expect(result).toBe('123');
    });
  });

  describe('Operand 2', () => {
    it('should have value 456 when input 123, add then 456', () => {
      service.input('1');
      service.input('2');
      service.input('3');
      service.add();
      service.input('4');
      service.input('5');
      service.input('6');
      const result = service.value();
      expect(result).toBe('456');
    });
  });

  describe('Operation', () => {
    it('should give result of operation', () => {
      service.input('1');
      service.input('2');
      service.input('3');
      service.add();
      service.input('4');
      service.input('5');
      service.input('6');
      service.solve();
      const result = service.value();
      expect(result).toBe('579');
    });

    it('should give the result of first operand if there is no operation', () => {
      service.input('1');
      service.solve();
      const result = service.value();
      expect(result).toBe('1');
    });
  });

  describe('Error', () => {
    it('should give divided by zero error', () => {
      service.divide();
      service.solve();
      const result = service.value();
      expect(result).toBe('div-by-0');
    });

    it('should not change error state when error and enter something', () => {
      service.divide();
      service.solve();
      service.input('1');
      const result = service.value();
      expect(result).toBe('div-by-0');
    });

    it('should not change error state when error and add', () => {
      service.divide();
      service.solve();
      service.add();
      const result = service.value();
      expect(result).toBe('div-by-0');
    });

    it('should not change error state when error and subtract', () => {
      service.divide();
      service.solve();
      service.subtract();
      const result = service.value();
      expect(result).toBe('div-by-0');
    });

    it('should not change error state when error and multiply', () => {
      service.divide();
      service.solve();
      service.multiply();
      const result = service.value();
      expect(result).toBe('div-by-0');
    });

    it('should not change error state when error and divide', () => {
      service.divide();
      service.solve();
      service.divide();
      const result = service.value();
      expect(result).toBe('div-by-0');
    });

    it('should be back to normal when reset', () => {
      service.divide();
      service.solve();
      service.reset();
      service.input('1');
      service.add();
      service.input('2');
      service.solve();
      const result = service.value();
      expect(result).toBe('3');
    });

    it('should be overflown if input digit more than max length', () => {
      service.setMaxLength(4);
      service.input('1');
      service.input('1');
      service.input('1');
      service.input('1');
      service.input('1');
      const result = service.value();
      expect(result).toBe('overflow');
    });

    it('should be overflown if number of digit in result is more than max length', () => {
      service.setMaxLength(4);
      service.input('9');
      service.input('9');
      service.input('9');
      service.input('9');
      service.add();
      service.input('1');
      service.solve();
      const result = service.value();
      expect(result).toBe('overflow');
    });
  });
});
