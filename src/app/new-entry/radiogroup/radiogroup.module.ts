import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ColorDirective } from './color.directive';

import { RadiogroupComponent } from  './radiogroup.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [ColorDirective, RadiogroupComponent],
  exports: [ColorDirective, RadiogroupComponent],
})
export class RadiogroupModule { }
