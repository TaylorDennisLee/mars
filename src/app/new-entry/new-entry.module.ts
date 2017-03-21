import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NewEntryComponent } from './new-entry.component';
import { AdditionalFieldComponent } from './additionalfield/additionalfield.component';

import { RadiogroupModule } from './radiogroup';

import { SuiModule } from '../ng2-semantic-ui/ng2-semantic-ui';
import { FlatpickrModule } from './flat/flatpickr.module';










@NgModule({
  imports: [
    CommonModule,
    SuiModule,
    ReactiveFormsModule,
    FlatpickrModule,
    RadiogroupModule
  ],
  declarations: [
    NewEntryComponent,
    AdditionalFieldComponent,
//     RadiogroupComponent
  ]
})
export class NewEntryModule { }
