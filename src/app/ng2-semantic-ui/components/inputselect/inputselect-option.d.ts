import { EventEmitter, ViewContainerRef } from '@angular/core';
export declare class SuiInputSelectOption {
    itemClass: boolean;
    value: any;
    selected: EventEmitter<any>;
    useTemplate: boolean;
    viewContainerRef: ViewContainerRef;
    readValue: (value: any) => string;
    constructor();
    click(event: MouseEvent): boolean;
}
