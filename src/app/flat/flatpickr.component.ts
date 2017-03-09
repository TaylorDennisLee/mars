import { Component, AfterViewInit, OnChanges, OnDestroy, forwardRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Flatpickr, FlatpickrOptions } from './models';

@Component({
  selector: 'cco-flatpickr',
  templateUrl: './flatpickr.component.html',
  styleUrls: ['./flatpickr.component.css'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FlatpickrComponent), multi: true }]
})
export class FlatpickrComponent implements AfterViewInit, ControlValueAccessor, OnChanges, OnDestroy {

  propagateChange: any = () => {};



  options: FlatpickrOptions = {enableTime: true};



  private selectedDate;
  private flatpickr: Flatpickr;

  @ViewChild('flatpickr')
  flatpickrElement: any;

    private flatpickrDefaultOptions = {
        onReady: () => this.ready.emit(),
        onOpen: () => this.opened.emit(),
        onClose: () => this.closed.emit(),
        onChange: (selectedDate: Date) => this.onChange(selectedDate),
    };


  _date: any;

  get date() {
    console.log('Get Date');
    return this._date
  }

  set date(date: string | Date) {
    console.log('Set Date');
    this._date = date;
    this.propagateChange(this._date);
  }



  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
            let options = Object.assign(this.flatpickrDefaultOptions, this.options);
        this.flatpickr = this.flatpickrElement.nativeElement.flatpickr(options);
  }

  ngOnDestroy() {
    this.flatpickr.destroy();
  }

  ngOnChanges() {
    console.log('ngOnChanges');
    this.propagateChange(this.date);

  }

  public setDate(date) {
    console.log('setDate');
    if (this.flatpickr) {
      this.flatpickr.setDate(date);
    }
  }

  @Output()
  ready = new EventEmitter<null>();

  @Output()
  opened = new EventEmitter<null>();

  @Output()
  closed = new EventEmitter<null>();


  @Output()
  dateChange = new EventEmitter<Date>();

  writeValue(value) {
    console.log('Write Value');
    if (value) {
      this.date = value;
    }
  }

  registerOnChange(fn) {
    console.log('registerOnChange');
    this.propagateChange = fn;
  }

  registerOnTouched() { 
    console.log('registerOnTouch');
  }

  private onChange( selectedDate: Date ) {
    this.dateChange.emit(selectedDate);
    this.date = selectedDate;
    console.log('On Change');
    console.log(selectedDate);
  }
}
