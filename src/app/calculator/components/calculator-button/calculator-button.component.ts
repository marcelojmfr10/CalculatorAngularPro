import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, input, output, signal, viewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [],
  templateUrl: './calculator-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './calculator-button.component.css',
  host: {
    class: 'border-r border-b border-indigo-400',
    '[class]': 'isDoubleSize() ? "w-2/4" : "w-1/4"',
    //attribute: 'hola',
    //'data-size': 'XL',
  },
  encapsulation: ViewEncapsulation.None,
})
export class CalculatorButtonComponent {

  public onClick = output<string>();
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');
  public isPressed = signal(false);

  public isCommand = input(false, {
    transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value,
  });

  public isDoubleSize = input(false, {
    transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value,
  });

  // @HostBinding('class.is-command') get commandStyle() {
  //   return this.isCommand();
  // }

  // @HostBinding('class.w-2/4') get commandStyle() {
  //   return this.isDoubleSize();
  // }

  handleClick() {
    if(!this.contentValue()?.nativeElement) {
      return;
    }
    const value = this.contentValue()!.nativeElement.innerText;
    this.onClick.emit(value.trim());
  }

  public keyboardPressedStyle(key: string) {
    if(!this.contentValue()) return;

    const value = this.contentValue()!.nativeElement.innerText;

    if(value !== key) return;

    this.isPressed.set(true);

    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);
  }
}
