import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlatpickrComponent } from './flatpickr.component';

export { Flatpickr, FlatpickrOptions } from './models'

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    declarations: [FlatpickrComponent],
    exports: [FlatpickrComponent],
})
export class FlatpickrModule { }
