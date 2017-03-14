import { Component, OnInit, forwardRef, Input, OnChanges } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radiogroup',
  templateUrl: './radiogroup.component.html',
  styleUrls: ['./radiogroup.component.css'],
  providers: [ { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RadiogroupComponent), multi: true }]
})
export class RadiogroupComponent implements ControlValueAccessor, OnChanges {



  @Input('radio_options') radio_options : any;

  propagateChange:any = () => {};

  _selected_button;

  get selected_button()
  {
    return this._selected_button;
  }

  set selected_button(val)
  {
    this._selected_button = val;
    console.log(val);
    this.propagateChange(val);
  }

  thisIndex(i)
  {
    console.log(i);
  }

  ngOnChanges()
  {
    this.propagateChange(this.selected_button);
  }


  constructor() { }

  ngOnInit()
  {
    
  }

  writeValue(value) {
    if (value) {
      this.selected_button = value;
    }

  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

}
