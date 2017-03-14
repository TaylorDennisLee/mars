import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-entry-select',
  templateUrl: './entry-select.component.html',
  styleUrls: ['./entry-select.component.scss']
})
export class EntrySelectComponent implements OnInit {

  form_options = ['DSC','FF','Flashforge','LFA','TGA','Wanhao'];
  select_form: FormGroup;
  constructor() { }

  ngOnInit() {
    this.select_form = new FormGroup({selected_form: new FormControl('')});
//    this.loadForms();
  }

  

}
