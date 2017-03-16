import { Component, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import { FlatpickrOptions } from '../flat';

import { Field } from './field.model';
import { EntryService } from './entry.service';
import { AdditionalFieldComponent } from './additionalfield/additionalfield.component';



@Component({
  selector: 'entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
  providers: [ EntryService ]
})

export class EntryComponent implements OnInit, OnDestroy {

  flat_options : FlatpickrOptions;
  public entry_form: FormArray;
  fields$: Observable<Field[]>;
  fields: Field[];
  form_name: string;
  private sub: any;
  constructor(
              private entry_service: EntryService,
              private route: ActivatedRoute,
              private router: Router
             ) {
    this.entry_form = new FormArray([]);
    this.flat_options = {allowInput: true, enableTime: true};
    }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => 
      {
        this.form_name = params['form_id'];
        console.log("Form Name: " + this.form_name);
      
      },
      error  => console.log("Error: " + error),
      ()     => console.log("finished")
    );
    this.getForm();
  }
  
  ngOnDestroy()
  {
    this.sub.unsubscribe();
  }


  getForm() {
    console.log('Getting Form!');
    console.log(this.form_name);
    // this.form_name = this.route.params['form_id'];
    // this.fields$ = this.route.params.switchMap((params: Params) => this.entry_service.getFields(params['form_id']));
    this.fields$ = this.entry_service.getFields(this.form_name);   
          
          this.fields$.subscribe(fields => this.fields = fields,
                      error => console.log("Error: " + error),
                         () => this.loadForm()
                   );
            }

  loadForm() {
      console.log('loading here');
      const control = <FormArray> this.entry_form;
      console.log('loading form');
      // for( let field of this.fields)
      for (let index in this.fields)
      {
//          console.log("Adding " + this.fields[index].field_name);
          switch(this.fields[index].field_type)
          {
              case "numeric": {
                  control.push(this.createNumericFormGroup(index));
                  break;
              }
              default: {
                  control.push(this.createBasicFormGroup(index));
                  break;
              }
          }

      }
  }

  addField() {
      console.log("Adding field!");
      const new_field = this.createNewAddiField();
      const control = <FormArray>this.entry_form;
      this.fields.push(new_field);
      control.push(this.createNewBasicFormGroup(new_field));
  }

  removeField(i: number) {
    console.log("remove caught");
    console.log('Fields length before: ' + String(this.fields.length));

      var newFields = [];
      for (let j in this.fields)
      {
        if (j != String(i-1))
        {
          newFields.push(this.fields[j]);
        }
      }
      this.fields = newFields;
      // for (let j of this.fields)
      // {
      //
      // }
      const control = <FormArray>this.entry_form;
      control.removeAt(i-1);
      console.log('Fields length now: ' + String(this.fields.length));
      console.log('complete');
  }


  createBasicFormGroup(thisindex: string)
  { 
    let thisField = this.fields[thisindex];
    return new FormGroup({
      field_type: new FormControl(thisField.field_type),
      field_name: new FormControl(thisField.field_name),
      field_order: new FormControl(Number(thisindex) + 1),
      field_value: new FormControl('')

    });
  }

  createNumericFormGroup(thisindex: string)
  {
    let thisField = this.fields[thisindex];
    return new FormGroup({
      field_type: new FormControl(thisField.field_type),
      field_name: new FormControl(thisField.field_name),
      field_order: new FormControl(Number(thisindex) + 1),
      field_value: new FormControl(''),
      field_unit: new FormControl(thisField.standard_unit)

    });
  }

  createNewBasicFormGroup(thisfield: Field)
  {
    return new FormGroup({
      field_type: new FormControl(thisfield.field_type),
      field_name: new FormControl(thisfield.field_name),
      field_order: new FormControl(thisfield.field_order),
      field_value: new FormControl('')

    });
  }

  createNewAddiField()
  {
    const new_field = {"field_type": "additional", "field_name": "", "field_order": 0, "field_value": ""};
    return new_field;
  }
}
