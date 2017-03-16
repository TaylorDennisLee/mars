import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';


// import { RadiogroupComponent } from './radiogroup/radiogroup.component';
import { RadiogroupModule } from './radiogroup';

import { SuiModule} from './ng2-semantic-ui/ng2-semantic-ui';
import { FlatpickrModule } from './flat/flatpickr.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { AppRoutingModule } from './app.routes';

import { SidebarModule } from './ng-sidebar';


import { EntryComponent } from './entry/entry.component';
import { AdditionalFieldComponent } from './entry/additionalfield/additionalfield.component';
import { EntrySelectComponent } from './entry-select/entry-select.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EntryComponent,
    AdditionalFieldComponent,
    EntrySelectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SidebarModule,
    AppRoutingModule,
    FlatpickrModule,
    SuiModule,
    RadiogroupModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
