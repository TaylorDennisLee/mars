import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent }   from './home/home.component';

import { EntryComponent }   from './entry/entry.component';




const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },

  { path: 'entry',  component: EntryComponent },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
