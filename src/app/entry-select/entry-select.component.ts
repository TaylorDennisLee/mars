import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-entry-select',
  templateUrl: './entry-select.component.html',
  styleUrls: ['./entry-select.component.scss']
})
export class EntrySelectComponent implements OnInit {


  form_options = ['DSC','FF','Flashforge','LFA','TGA','Wanhao'];
  public selected_form:any;
  constructor(
     private route: ActivatedRoute,
    private router: Router 
  
  ) { }

  ngOnInit() {
//    this.loadForms();
  }


  choose() {
    this.router.navigate(['/entry', this.selected_form]);
  }
  

}
