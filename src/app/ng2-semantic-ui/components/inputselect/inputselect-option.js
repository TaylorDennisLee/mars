var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, HostBinding, HostListener, EventEmitter, ViewContainerRef, ViewChild, } from '@angular/core';
var SuiInputSelectOption = (function () {
    function SuiInputSelectOption() {
        this.itemClass = true;
        this.selected = new EventEmitter();
        this.useTemplate = false;
        this.readValue = function (value) { return ""; };
    }
    SuiInputSelectOption.prototype.click = function (event) {
        event.stopPropagation();
        this.selected.emit(this.value);
        return false;
    };
    return SuiInputSelectOption;
}());
__decorate([
    HostBinding('class.item'),
    __metadata("design:type", Object)
], SuiInputSelectOption.prototype, "itemClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SuiInputSelectOption.prototype, "value", void 0);
__decorate([
    ViewChild('optionRenderTarget', { read: ViewContainerRef }),
    __metadata("design:type", ViewContainerRef)
], SuiInputSelectOption.prototype, "viewContainerRef", void 0);
__decorate([
    HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", Boolean)
], SuiInputSelectOption.prototype, "click", null);
SuiInputSelectOption = __decorate([
    Component({
        selector: 'sui-input-select-option',
        template: "\n<span #optionRenderTarget></span>\n<span *ngIf=\"!useTemplate\">{{ readValue(value) }}</span>\n"
    }),
    __metadata("design:paramtypes", [])
], SuiInputSelectOption);
export { SuiInputSelectOption };
//# sourceMappingURL=inputselect-option.js.map