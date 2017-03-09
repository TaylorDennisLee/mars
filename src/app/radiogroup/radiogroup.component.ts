import { Component, OnInit, forwardRef, Input, OnChanges } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radiogroup',
  templateUrl: './radiogroup.component.html',
  styleUrls: ['./radiogroup.component.css'],
  providers: [ { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RadiogroupComponent), multi: true }]
})
export class RadiogroupComponent implements ControlValueAccessor, OnChanges {


  propagateChange:any = () => {};

  _selected_button;

  get selected_button()
  {
    return this._selected_button;
  }

  set selected_button(val)
  {
    this._selected_button = val;
    this.propagateChange(val);
  }

  ngOnChanges()
  {
    this.propagateChange(this.selected_button);
  }


  constructor() { }

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
