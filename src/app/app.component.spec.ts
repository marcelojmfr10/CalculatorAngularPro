import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should be 3', () => {
    // arrange
    const num1 = 1;
    const num2 = 2;

    // act
    const result = num1 + num2;

    // assert
    expect(result).toBe(3);
  });

  it(`should have the 'zoneless-calculator' title`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('zoneless-calculator');
  });

  it('should render router-outlet', () => {
    // fixture.detectChanges();
    // expect(compiled.querySelector('h1')?.textContent).toContain('Hello, zoneless-calculator');
    expect(compiled.querySelector('router-outlet')).toBeDefined();
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

  it('should render router-outlet wrapped with css classes', () => {
    const divElement = compiled.querySelector('div');

    const cssClasses =
      'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(
        ' ',
      );
    expect(divElement).toBeDefined();

    // divElement?.classList.forEach((className) => {
    //   expect(cssClasses).toContain(className);
    // });

    const divClasses = divElement?.classList.value.split(' ');

    cssClasses.forEach((className) => {
      expect(divClasses).toContain(className);
    });
  });

  it('should contain the "Buy me a beer" link', () => {
    const anchorElement = compiled.querySelector('a');
    expect(anchorElement).toBeDefined();
    expect(anchorElement?.title).toContain('Buy me a beer');
    expect(anchorElement?.getAttribute('href')).toBe(
      'https://www.buymeacoffee.com/scottwindon',
    );
    expect(anchorElement?.href).toBe(
      'https://www.buymeacoffee.com/scottwindon',
    );
  });
});
