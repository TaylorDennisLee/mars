import {
    Component, Input, HostBinding, HostListener, EventEmitter, ViewContainerRef, ViewChild,
} from '@angular/core';

@Component({
    selector: 'sui-input-select-option',
    template: `
<span #optionRenderTarget></span>
<span *ngIf="!useTemplate">{{ readValue(value) }}</span>
`
})
export class SuiInputSelectOption {
    @HostBinding('class.item') itemClass = true;

    @Input()
    public value:any;

    public selected:EventEmitter<any> = new EventEmitter<any>();

    public useTemplate:boolean = false;

    @ViewChild('optionRenderTarget', { read: ViewContainerRef })
    public viewContainerRef:ViewContainerRef;

    public readValue = (value:any) => "";

    constructor() {}

    @HostListener('click', ['$event'])
    public click(event:MouseEvent):boolean {
        event.stopPropagation();
        this.selected.emit(this.value);
        return false;
    }
}
