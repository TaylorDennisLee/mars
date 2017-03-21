import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';



@Component({
    selector: 'additionalfield',
    styleUrls: ['./additionalfield.component.scss'],
    templateUrl: './additionalfield.component.html'

})
export class AdditionalFieldComponent implements OnInit {

    private stage_switch: boolean;
    private fieldname: string;
    private _fieldnumber: number;
    // @Input('fieldnumber') public fieldnumber: number;


    @Input('group') public fieldGroup: FormGroup;
    @Output() removeField = new EventEmitter<number>();

    @Input()
    set fieldnumber(fieldnumber: number)
    {
        this._fieldnumber = fieldnumber;
        this.fieldGroup.controls['field_order'].setValue(fieldnumber);
    }
    get fieldnumber()
    {
        return this._fieldnumber;
    }


    ngOnInit()
    {
        this.stage_switch = false;
    }


    nextStage()
    {
        this.stage_switch = true;
        console.log(this.fieldname);
    }

    backStage()
    {
        this.stage_switch = false;
    }



    remove()
    {
        console.log("remove");
        console.log(this.fieldnumber);
        this.removeField.emit(this.fieldnumber);
    }
}
