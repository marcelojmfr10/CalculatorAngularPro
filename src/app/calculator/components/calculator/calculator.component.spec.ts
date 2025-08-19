import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from '@/calculator/services/calculator.service';
import { inject } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';

class MockCalculatorService {
  public resultText = jasmine.createSpy('resultText').and.returnValue('100.00');
  public subResultText = jasmine.createSpy('subResultText').and.returnValue('20');
  public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('-');

  public constructNumber = jasmine.createSpy('constructNumber');
}

describe('CalculatorComponent', () => {
  let fixture: ComponentFixture<CalculatorComponent>;
  let compiled: HTMLElement;
  let component: CalculatorComponent;
  let service: MockCalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        {
          provide: CalculatorService, useClass: MockCalculatorService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    service = TestBed.inject(CalculatorService) as unknown as MockCalculatorService;

    // fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have the current getters', () => {
    expect(component.resultText()).toBe('100.00');
    expect(component.subResultText()).toBe('20');
    expect(component.lastOperator()).toBe('-');
  });

  it('should display proper calculation values', () => {
    service.resultText.and.returnValue('123');
    service.subResultText.and.returnValue('15');
    service.lastOperator.and.returnValue('*');
    fixture.detectChanges();

    expect(component.resultText()).toBe('123');
    expect(component.subResultText()).toBe('15');
    expect(component.lastOperator()).toBe('*');
    expect(compiled.querySelector('span')?.innerText).toBe('15 *');
  });

  it('should have 19 calculator-button components', () => {
    expect(component.calculatorButtons()).toBeTruthy();
    expect(component.calculatorButtons().length).toBe(19);
  });

  it('should have 19 calculator-button components with content projection', () => {
    const buttons = compiled.querySelectorAll('calculator-button');
    // const buttonsByDirective = fixture.debugElement.queryAll(By.directive(CalculatorButtonComponent));

    expect(buttons.length).toBe(19);
    expect(buttons[0].textContent!.trim()).toBe('C');
    expect(buttons[1].textContent!.trim()).toBe('+/-');
    expect(buttons[2].textContent!.trim()).toBe('%');
    expect(buttons[3].textContent!.trim()).toBe('÷');
  });

  it('should handle keyboard events correctly', () => {
    const eventEnter = new KeyboardEvent('keyup', {key: 'Enter'});
    document.dispatchEvent(eventEnter);

    const eventESC = new KeyboardEvent('keyup', {key: 'Escape'});
    document.dispatchEvent(eventESC);

    expect(service.constructNumber).toHaveBeenCalled();
    expect(service.constructNumber).toHaveBeenCalledWith('=');
    expect(service.constructNumber).toHaveBeenCalledWith('C');
  });

  it('should display result text correctly', () => {
    service.resultText.and.returnValues('123');
    service.subResultText.and.returnValues('10');
    service.lastOperator.and.returnValues('-');
    fixture.detectChanges();

    expect(component.resultText()).toBe('123');

    expect(compiled.querySelector('#sub-result')?.textContent).toBe('10 -');
  });

});
