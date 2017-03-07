import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';
// import { PageNotFoundComponent }   from './not-found.component';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SidebarModule } from './ng-sidebar';

@NgModule({
  declarations: [
    AppComponent,
   // PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SidebarModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
