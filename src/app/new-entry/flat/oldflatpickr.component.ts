import { Component, AfterViewInit, OnChanges, OnDestroy, forwardRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Flatpickr, FlatpickrOptions } from './models';

@Component({
  selector: 'acmflatpickr',
  templateUrl: './flatpickr.component.html',
  styleUrls: ['./flatpickr.component.css'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FlatpickrComponent), multi: true }]
})
export class FlatpickrComponent implements AfterViewInit, ControlValueAccessor, OnChanges, OnDestroy {

  propagateChange: any = () => { };

  options: FlatpickrOptions = {};

  private flatpickr: Flatpickr;
  private flatpickrDefaultOptions = {
    onReady: () => this.ready.emit(),
    onOpen: () => this.opened.emit(),
    onClose: () => this.closed.emit(),
    onChange: (selectedDates: Date[]) => this.onChange(selectedDates),
  };

  @ViewChild('flatpickr') flatpickrElement: any;




  _date: any;

  get date() {
    return this._date
  }

  set date(date: string | Date) {
    this._date = date;
  }



  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let options = Object.assign(this.flatpickrDefaultOptions, this.options);
    this.flatpickr = this.flatpickrElement.nativeElement.flatpickr({});
  }

  ngOnDestroy() {
    this.flatpickr.destroy();
  }

  ngOnChanges() {
    this.propagateChange(this.date);

  }

  public setDate(date) {
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
  dateChange = new EventEmitter<Date[]>();
  writeValue(value) {
    if (value) {
      this.date = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }

  private onChange(selectedDates: Date[]) {
    this.dateChange.emit(selectedDates);
  }
}
