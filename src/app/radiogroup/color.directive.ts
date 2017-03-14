import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[setColor]',
  host: {'(click)':'setColor()'}
})
export class ColorDirective {

  constructor(private el: ElementRef) { }

  setColor() {
    console.log('Set Color');
    this.colorSelected('red');
  }

//  @HostListener('click') onClick() {
//    this.colorSelected('red');
//  }

	private colorSelected(option: string)
	{
    console.log('dir: ');
    console.log('color selected');
		this.el.nativeElement.style.backgroundColor = option;
	}

}
